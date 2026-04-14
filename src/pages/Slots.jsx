import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRazorpay } from "../hooks/useRazorpay";

function Slots() {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const { openCheckout } = useRazorpay();

  const [slots, setSlots] = useState([]);
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingSlot, setBookingSlot] = useState(null);
  const [confirmSlot, setConfirmSlot] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showBillPreview, setShowBillPreview] = useState(false); // ✅ Bill preview state

  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const fetchTurf = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/turfs/${turfId}`);
      const data = await res.json();
      if (data.success) setTurf(data.data);
    } catch {}
  };

  const fetchSlots = async (date) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `http://localhost:5000/api/slots?turfId=${turfId}&date=${date}`
      );
      const data = await res.json();
      if (data.success) setSlots(data.data || []);
      else setError(data.message);
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTurf(); }, [turfId]);
  useEffect(() => { if (selectedDate) fetchSlots(selectedDate); }, [selectedDate, turfId]);

  // ✅ Calculate duration in hours between two time strings (e.g. "10:00", "11:00")
  const calcDuration = (start, end) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return ((eh * 60 + em) - (sh * 60 + sm)) / 60;
  };

  const duration = confirmSlot
    ? calcDuration(confirmSlot.startTime, confirmSlot.endTime)
    : 0;
  const totalAmount = turf ? Math.round(turf.pricePerHour * duration) : 0;

  // ✅ When user clicks "Book" on slot — show bill preview first
  const handleSlotClick = (slot) => {
    setConfirmSlot(slot);
    setShowBillPreview(true);
  };

  // ✅ Actual payment after bill preview confirmed
  const handleBook = async () => {
    if (!confirmSlot) return;
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    setShowBillPreview(false);
    setPaymentLoading(true);
    setBookingSlot(confirmSlot.startTime);

    try {
      // Step 1 — Create order on backend
      const orderRes = await fetch("http://localhost:5000/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          turfId,
          date: selectedDate,
          startTime: confirmSlot.startTime,
          endTime: confirmSlot.endTime,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        alert(orderData.message || "Order create failed");
        return;
      }

      // Step 2 — Open Razorpay with UPI + all methods enabled
      const paymentResponse = await openCheckout({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "TurfBook",
        description: `${turf?.name} — ${selectedDate} ${confirmSlot.startTime}`,
        prefill: { name: "", email: "" },
        theme: { color: "#15803d" },
        // ✅ UPI + all payment methods enabled
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        // ✅ UPI options
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay via UPI",
                instruments: [
                  { method: "upi", flows: ["qr", "intent", "collect", "web"] },
                ],
              },
              other: {
                name: "Other payment methods",
                instruments: [
                  { method: "card" },
                  { method: "netbanking" },
                  { method: "wallet" },
                ],
              },
            },
            sequence: ["block.upi", "block.other"],
            preferences: { show_default_blocks: false },
          },
        },
      });

      // Step 3 — Verify payment on backend
      const verifyRes = await fetch("http://localhost:5000/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: paymentResponse.razorpay_order_id,
          paymentId: paymentResponse.razorpay_payment_id,
          signature: paymentResponse.razorpay_signature,
          bookingId: orderData.bookingId,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        // ✅ Navigate to receipt/bill page with booking data
        navigate("/booking/receipt", {
          state: {
            booking: verifyData.data,
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id,
            turfName: turf?.name,
            amount: totalAmount,
            date: selectedDate,
            startTime: confirmSlot.startTime,
            endTime: confirmSlot.endTime,
            duration,
            pricePerHour: turf?.pricePerHour,
          },
        });
      } else {
        alert("Payment verification failed. Contact support.");
      }

    } catch (err) {
      if (err.message === "PAYMENT_CANCELLED") {
        // ✅ Fixed: send bookingId properly (from orderData)
        await fetch("http://localhost:5000/api/payments/failed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingId: orderData?.bookingId || null,
            reason: "Cancelled by user",
          }),
        });
        alert("Payment cancelled. Slot released.");
      } else {
        alert("Payment failed. Please try again.");
      }
    } finally {
      setPaymentLoading(false);
      setBookingSlot(null);
      setConfirmSlot(null);
    }
  };

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

      {/* ✅ BILL PREVIEW MODAL — shown before payment */}
      {showBillPreview && confirmSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden">

            {/* Header */}
            <div className="bg-green-700 px-6 py-4">
              <h3 className="text-white font-black text-lg">Booking Summary</h3>
              <p className="text-green-200 text-xs mt-0.5">Review before payment</p>
            </div>

            {/* Details */}
            <div className="px-6 py-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Turf</span>
                <span className="font-semibold text-gray-900">{turf?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold text-gray-900">{selectedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="font-semibold text-gray-900">
                  {confirmSlot.startTime} — {confirmSlot.endTime}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold text-gray-900">{duration} hr{duration !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rate</span>
                <span className="font-semibold text-gray-900">₹{turf?.pricePerHour}/hr</span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-black text-base">Total</span>
                  <span className="text-green-700 font-black text-xl">₹{totalAmount}</span>
                </div>
              </div>

              {/* UPI note */}
              <div className="bg-blue-50 rounded-xl px-4 py-3 flex items-center gap-2 mt-2">
                <span className="text-blue-700 text-xs font-semibold">
                  💳 UPI, Card, Netbanking & Wallet accepted
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => { setShowBillPreview(false); setConfirmSlot(null); }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-500 text-sm hover:bg-gray-50 transition font-semibold">
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={paymentLoading}
                className="flex-1 py-2.5 bg-green-700 text-white rounded-xl text-sm font-black hover:bg-green-800 transition disabled:opacity-60">
                {paymentLoading ? "Processing..." : "Pay ₹" + totalAmount}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80">
            <img
              src={turf?.images?.[0] || "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80"}
              alt="turf"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-6 border-b border-gray-100">
          <h1 className="text-3xl font-black text-gray-900 mb-3">{turf?.name || "Turf Arena"}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
            <span>📍 {turf?.location?.address} {turf?.location?.city}</span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span>🕐 {turf?.openTime || "06:00"} — {turf?.closeTime || "22:00"}</span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span className="text-green-700 font-semibold">💰 ₹{turf?.pricePerHour}/hr</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-xl font-black text-gray-900 mb-3">Select Date</h2>
            <input
              type="date"
              value={selectedDate}
              min={todayStr}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-2 border-green-200 rounded-xl px-4 py-2.5 text-gray-700 font-semibold focus:outline-none focus:border-green-600 transition"
            />
          </div>

          {successMsg && (
            <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold text-sm">
              {successMsg}
            </div>
          )}

          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Available Slots — {selectedDate}
          </h2>

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
                  const isBooking = bookingSlot === slot.startTime;
                  return (
                    <button
                      key={i}
                      disabled={slot.isBooked || slot.isPast || isBooking}
                      onClick={() => handleSlotClick(slot)}  // ✅ updated
                      className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                        slot.isPast
                          ? "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
                          : slot.isBooked
                          ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed line-through"
                          : isBooking
                          ? "bg-green-100 border-green-300 text-green-700 cursor-wait"
                          : "bg-green-50 border-green-200 text-green-800 hover:bg-green-700 hover:text-white hover:border-green-700 cursor-pointer"
                      }`}>
                      {isBooking ? "Processing..." : (
                        <>
                          {slot.startTime} — {slot.endTime}
                          {slot.isBooked && <span className="block text-xs mt-0.5 text-red-400">Booked</span>}
                          {slot.isPast && <span className="block text-xs mt-0.5 text-gray-300">Expired</span>}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-50 border border-green-200" />
                  <span className="text-gray-500 text-xs">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-50 border border-red-200" />
                  <span className="text-gray-500 text-xs">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-50 border border-gray-200" />
                  <span className="text-gray-500 text-xs">Expired</span>
                </div>
              </div>
            </>
          )}

          <button
            onClick={() => navigate("/turfs")}
            className="mt-8 text-gray-400 text-sm hover:text-gray-600 flex items-center gap-1 transition">
            ← Back to Turfs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slots;