import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRazorpay } from "../hooks/useRazorpay";

const STEP_NONE = 0;
const STEP_CONFIRM = 1;
const STEP_DETAILS = 2;

function Slots() {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const { openCheckout } = useRazorpay();

  const [slots, setSlots] = useState([]);
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [step, setStep] = useState(STEP_NONE);
  const [selectionError, setSelectionError] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const [userDetails, setUserDetails] = useState({
    name: "", email: "", phone: "", players: "1",
  });
  const [detailError, setDetailError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // Auto-refresh every minute for live expiry
  useEffect(() => {
    const interval = setInterval(() => fetchSlots(selectedDate), 60000);
    return () => clearInterval(interval);
  }, [selectedDate, turfId]);

  const fetchTurf = async () => {
    try {
      const res = await fetch(`https://turfxo-backend-2.onrender.com/api/turfs/${turfId}`);
      const data = await res.json();
      if (data.success) setTurf(data.data);
    } catch {}
  };

  const fetchSlots = useCallback(async (date) => {
    try {
      setLoading(true);
      setError("");
      setSelectedSlots([]);
      const res = await fetch(
        `https://turfxo-backend-2.onrender.com/api/slots?turfId=${turfId}&date=${date}`
      );
      const data = await res.json();
      if (data.success) setSlots(data.data || []);
      else setError(data.message);
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [turfId]);

  useEffect(() => { fetchTurf(); }, [turfId]);
  useEffect(() => { if (selectedDate) fetchSlots(selectedDate); }, [selectedDate, turfId]);

  const calcDuration = (start, end) => {
    const [sh, sm] = start.split(":").map(Number);
    let [eh, em] = end.split(":").map(Number);
    let startM = sh * 60 + sm;
    let endM = eh * 60 + em;
    if (endM <= startM) endM += 24 * 60;
    return (endM - startM) / 60;
  };

  const totalDuration = selectedSlots.reduce(
    (sum, slot) => sum + calcDuration(slot.startTime, slot.endTime), 0
  );
  const totalAmount = turf ? Math.round(turf.pricePerHour * totalDuration) : 0;

  const handleSlotClick = (slot) => {
    if (slot.isBooked || slot.isPast) return;
    setSelectionError("");

    const isSelected = selectedSlots.some((s) => s.startTime === slot.startTime);

    if (isSelected) {
      const idx = selectedSlots.findIndex((s) => s.startTime === slot.startTime);
      if (idx === selectedSlots.length - 1) {
        setSelectedSlots(selectedSlots.slice(0, -1));
      } else {
        setSelectionError("Sirf last selected slot deselect kar sakte ho.");
      }
      return;
    }

    if (selectedSlots.length > 0) {
      const lastSlot = selectedSlots[selectedSlots.length - 1];
      if (lastSlot.endTime !== slot.startTime) {
        setSelectionError("Sirf consecutive slots select kar sakte ho.");
        return;
      }
    }

    setSelectedSlots([...selectedSlots, slot]);
  };

  const handleProceed = () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    if (selectedSlots.length < 2) {
      setSelectionError("Kam se kam 2 slots select karo.");
      return;
    }
    setSelectionError("");
    setStep(STEP_CONFIRM);
  };

  const handleConfirm = () => setStep(STEP_DETAILS);

  const handlePayNow = async () => {
    const { name, email, phone } = userDetails;
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setDetailError("Please fill all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setDetailError("Please enter a valid email.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setDetailError("Please enter a valid 10-digit phone number.");
      return;
    }

    setDetailError("");
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    setStep(STEP_NONE);
    setPaymentLoading(true);

    const firstSlot = selectedSlots[0];
    const lastSlot = selectedSlots[selectedSlots.length - 1];
    let orderData = null;

    try {
      const orderRes = await fetch("https://turfxo-backend-2.onrender.com/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          turfId,
          date: selectedDate,
          startTime: firstSlot.startTime,
          endTime: lastSlot.endTime,
          playerName: userDetails.name,
          playerPhone: userDetails.phone,
          players: Number(userDetails.players),
        }),
      });

      orderData = await orderRes.json();
      if (!orderData.success) { alert(orderData.message || "Order create failed"); return; }

      const paymentResponse = await openCheckout({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "TurfXO",
        description: `${turf?.name} — ${selectedDate} ${firstSlot.startTime}-${lastSlot.endTime}`,
        prefill: { name: userDetails.name, email: userDetails.email, contact: userDetails.phone },
        theme: { color: "#15803d" },
        method: { upi: true, card: true, netbanking: true, wallet: true },
      });

      const verifyRes = await fetch("https://turfxo-backend-2.onrender.com/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          orderId: paymentResponse.razorpay_order_id,
          paymentId: paymentResponse.razorpay_payment_id,
          signature: paymentResponse.razorpay_signature,
          bookingId: orderData.bookingId,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        navigate("/booking/receipt", {
          state: {
            booking: verifyData.data,
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id,
            turfName: turf?.name,
            amount: totalAmount,
            date: selectedDate,
            startTime: firstSlot.startTime,
            endTime: lastSlot.endTime,
            duration: totalDuration,
            pricePerHour: turf?.pricePerHour,
            playerName: userDetails.name,
            playerPhone: userDetails.phone,
          },
        });
      } else {
        alert("Payment verification failed. Contact support.");
      }
    } catch (err) {
      if (err.message === "PAYMENT_CANCELLED") {
        await fetch("https://turfxo-backend-2.onrender.com/api/payments/failed", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ bookingId: orderData?.bookingId || null, reason: "Cancelled by user" }),
        });
        alert("Payment cancelled. Slot released.");
      } else {
        alert("Payment failed. Please try again.");
      }
    } finally {
      setPaymentLoading(false);
      setSelectedSlots([]);
      setUserDetails({ name: "", email: "", phone: "", players: "1" });
    }
  };

  const closeModal = () => { setStep(STEP_NONE); setDetailError(""); };

  if (error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">⚠️</p>
          <p className="text-red-500 font-bold text-lg mb-4">{error}</p>
          <button onClick={() => navigate("/turfs")}
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-800 transition">
            Back to Turfs
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">

      {/* ── MODAL ── */}
      {step !== STEP_NONE && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">

            {/* STEP 1 — CONFIRM */}
            {step === STEP_CONFIRM && (
              <>
                <div className="bg-green-700 px-6 py-4">
                  <h3 className="text-white font-black text-lg">Booking Summary</h3>
                  <p className="text-green-200 text-xs mt-0.5">{selectedSlots.length} slots selected</p>
                </div>
                <div className="px-6 py-5 space-y-3">
                  {[
                    ["Turf", turf?.name],
                    ["Date", selectedDate],
                    ["Time", `${selectedSlots[0]?.startTime} — ${selectedSlots[selectedSlots.length - 1]?.endTime}`],
                    ["Slots", `${selectedSlots.length} slot${selectedSlots.length > 1 ? "s" : ""}`],
                    ["Duration", `${totalDuration} hr${totalDuration !== 1 ? "s" : ""}`],
                    ["Rate", `₹${turf?.pricePerHour}/hr`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                  <div className="border-t border-dashed border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-black text-base">Total</span>
                      <span className="text-green-700 font-black text-xl">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 flex gap-3">
                  <button onClick={closeModal}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-500 text-sm hover:bg-gray-50 transition font-semibold">
                    Cancel
                  </button>
                  <button onClick={handleConfirm}
                    className="flex-1 py-2.5 bg-green-700 text-white rounded-xl text-sm font-black hover:bg-green-800 transition">
                    Confirm →
                  </button>
                </div>
              </>
            )}

            {/* STEP 2 — DETAILS */}
            {step === STEP_DETAILS && (
              <>
                <div className="bg-green-700 px-6 py-4">
                  <h3 className="text-white font-black text-lg">Player Details</h3>
                  <p className="text-green-200 text-xs mt-0.5">Fill details to complete booking</p>
                </div>
                <div className="px-6 py-5 space-y-4">
                  <div className="bg-green-50 rounded-xl px-4 py-3 text-xs text-green-800 font-semibold flex justify-between">
                    <span>📅 {selectedDate} &nbsp;🕐 {selectedSlots[0]?.startTime} — {selectedSlots[selectedSlots.length - 1]?.endTime}</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  {detailError && <p className="text-red-500 text-xs font-semibold">{detailError}</p>}
                  {[
                    { label: "Full Name", key: "name", type: "text", placeholder: "John Doe" },
                    { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "10-digit mobile number", maxLength: 10 },
                  ].map(({ label, key, type, placeholder, maxLength }) => (
                    <div key={key}>
                      <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1">
                        {label} <span className="text-red-400">*</span>
                      </label>
                      <input type={type} placeholder={placeholder} maxLength={maxLength}
                        value={userDetails[key]}
                        onChange={(e) => setUserDetails({
                          ...userDetails,
                          [key]: key === "phone" ? e.target.value.replace(/\D/, "") : e.target.value
                        })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-green-500 transition"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Number of Players</label>
                    <select value={userDetails.players}
                      onChange={(e) => setUserDetails({ ...userDetails, players: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-green-500 transition">
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                        <option key={n} value={n}>{n} Player{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-blue-50 rounded-xl px-4 py-2.5">
                    <span className="text-blue-700 text-xs font-semibold">💳 UPI · Card · Netbanking · Wallet accepted</span>
                  </div>
                </div>
                <div className="px-6 pb-6 flex gap-3">
                  <button onClick={() => setStep(STEP_CONFIRM)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-500 text-sm hover:bg-gray-50 transition font-semibold">
                    ← Back
                  </button>
                  <button onClick={handlePayNow} disabled={paymentLoading}
                    className="flex-1 py-2.5 bg-green-700 text-white rounded-xl text-sm font-black hover:bg-green-800 transition disabled:opacity-60">
                    {paymentLoading ? "Processing..." : `Pay ₹${totalAmount}`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── MAIN PAGE ── */}
      {/* ✅ pb-28 — bottom mein space sticky bar ke liye */}
      <div className="pt-20 pb-28">
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img
              src={turf?.images?.[0] || "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80"}
              alt="turf" className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-6 border-b border-gray-100">
          <h1 className="text-3xl font-black text-gray-900 mb-3">{turf?.name || "Turf Arena"}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
            <span>📍 {turf?.location?.address} {turf?.location?.city}</span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span>🕐 {turf?.openTime || "06:00"} — {turf?.closeTime || "03:00"}</span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span className="text-green-700 font-semibold">💰 ₹{turf?.pricePerHour}/hr</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* DATE PICKER */}
          <div className="mb-8">
            <h2 className="text-xl font-black text-gray-900 mb-3">Select Date</h2>
            <input type="date" value={selectedDate} min={todayStr}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-2 border-green-200 rounded-xl px-4 py-2.5 text-gray-700 font-semibold focus:outline-none focus:border-green-600 transition"
            />
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Available Slots — {selectedDate}
          </h2>

          {/* HINT */}
          <div className="mb-4 flex items-start gap-2 text-xs text-gray-400">
            <span>ℹ️</span>
            <span>Minimum 2 consecutive slots select karo. Last slot ko dubara click karo deselect karne ke liye.</span>
          </div>

          {/* SELECTION ERROR */}
          {selectionError && (
            <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm font-semibold">
              ⚠️ {selectionError}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center py-16 gap-4">
              <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading slots...</p>
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-5xl mb-4">📅</p>
              <p className="text-gray-500 font-semibold">No slots available</p>
              <p className="text-gray-400 text-sm mt-1">Try another date</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((slot, i) => {
                  const isSelected = selectedSlots.some((s) => s.startTime === slot.startTime);
                  return (
                    <button key={i}
                      disabled={slot.isBooked || slot.isPast || paymentLoading}
                      onClick={() => handleSlotClick(slot)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                        slot.isPast
                          ? "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
                          : slot.isBooked
                          ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-green-700 border-green-700 text-white shadow-lg scale-105"
                          : "bg-green-50 border-green-200 text-green-800 hover:bg-green-100 hover:border-green-400 cursor-pointer"
                      }`}>
                      {slot.startTime} — {slot.endTime}
                      {isSelected && <span className="block text-xs mt-0.5 text-green-200">✓ Selected</span>}
                      {slot.isBooked && <span className="block text-xs mt-0.5 text-red-400">Booked</span>}
                      {slot.isPast && <span className="block text-xs mt-0.5 text-gray-300">Expired</span>}
                    </button>
                  );
                })}
              </div>

              {/* LEGEND */}
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-100">
                {[
                  { color: "bg-green-50 border-green-200", label: "Available" },
                  { color: "bg-green-700 border-green-700", label: "Selected" },
                  { color: "bg-red-50 border-red-200", label: "Booked" },
                  { color: "bg-gray-50 border-gray-200", label: "Expired" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded border-2 ${color}`} />
                    <span className="text-gray-500 text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <button onClick={() => navigate("/turfs")}
            className="mt-8 text-gray-400 text-sm hover:text-gray-600 flex items-center gap-1 transition">
            ← Back to Turfs
          </button>
        </div>
      </div>

      {/* ✅ STICKY BOTTOM BAR — tab dikhega jab slots selected hon */}
      {selectedSlots.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">

            {/* Left — Selection info */}
            <div>
              <p className="text-gray-900 font-black text-base">
                {selectedSlots.length} Slot{selectedSlots.length > 1 ? "s" : ""} Selected
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                🕐 {selectedSlots[0].startTime} — {selectedSlots[selectedSlots.length - 1].endTime}
                &nbsp;·&nbsp;
                {totalDuration} hr{totalDuration !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Right — Amount + Book Now */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-green-700 font-black text-xl">₹{totalAmount}</p>
                <p className="text-gray-400 text-xs">Total Amount</p>
              </div>
              <button onClick={handleProceed} disabled={paymentLoading}
                className="bg-green-700 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-green-800 transition disabled:opacity-60 whitespace-nowrap">
                {paymentLoading ? "Processing..." : "Book Now →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slots;