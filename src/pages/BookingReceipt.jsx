import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function BookingReceipt() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If user lands here directly without state, redirect
  useEffect(() => {
    if (!state) navigate("/turfs");
  }, [state, navigate]);

  if (!state) return null;

  const {
    paymentId,
    orderId,
    turfName,
    amount,
    date,
    startTime,
    endTime,
    duration,
    pricePerHour,
    booking,
  } = state;

  const bookingId = booking?._id || "—";
  const bookedAt = booking?.updatedAt
    ? new Date(booking.updatedAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Success badge */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Payment Successful!</h1>
          <p className="text-gray-400 text-sm mt-1">Your slot has been confirmed</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

          {/* Receipt Header */}
          <div className="bg-green-700 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-green-200 text-xs font-semibold uppercase tracking-wide">Receipt</p>
              <p className="text-white font-black text-base mt-0.5">TurfBook</p>
            </div>
            <div className="text-right">
              <p className="text-green-200 text-xs">Booking ID</p>
              <p className="text-white font-mono text-xs mt-0.5 break-all">{String(bookingId).slice(-10)}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="px-6 py-5 space-y-3 border-b border-dashed border-gray-200">
            <Row label="Turf" value={turfName} />
            <Row label="Date" value={date} />
            <Row label="Time Slot" value={`${startTime} — ${endTime}`} />
            <Row label="Duration" value={`${duration} hr${duration !== 1 ? "s" : ""}`} />
            <Row label="Rate" value={`₹${pricePerHour}/hr`} />
          </div>

          {/* Amount */}
          <div className="px-6 py-4 border-b border-dashed border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-semibold">Subtotal</span>
              <span className="text-gray-900 font-semibold">₹{amount}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-500 text-sm font-semibold">Platform Fee</span>
              <span className="text-green-600 font-semibold text-sm">FREE</span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <span className="text-gray-900 font-black text-base">Total Paid</span>
              <span className="text-green-700 font-black text-2xl">₹{amount}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="px-6 py-5 space-y-3 bg-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Payment Info</p>
            <Row label="Payment ID" value={paymentId} mono />
            <Row label="Order ID" value={orderId} mono />
            <Row label="Status" value="Paid" success />
            <Row label="Paid On" value={bookedAt} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/turfs")}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 text-sm font-bold hover:bg-gray-100 transition">
            Book Another
          </button>
          <button
            onClick={() => navigate("/my-bookings")}
            className="flex-1 py-3 bg-green-700 text-white rounded-xl text-sm font-black hover:bg-green-800 transition">
            My Bookings
          </button>
        </div>

        {/* Print hint */}
        <p className="text-center text-gray-400 text-xs mt-4">
          Screenshot this page to save your receipt
        </p>
      </div>
    </div>
  );
}

// Reusable row component
function Row({ label, value, mono = false, success = false }) {
  return (
    <div className="flex justify-between items-start gap-4 text-sm">
      <span className="text-gray-400 shrink-0">{label}</span>
      <span className={`text-right break-all font-semibold ${
        mono ? "font-mono text-xs text-gray-600" :
        success ? "text-green-600" :
        "text-gray-900"
      }`}>
        {value}
      </span>
    </div>
  );
}

export default BookingReceipt;