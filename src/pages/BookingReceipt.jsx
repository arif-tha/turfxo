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
    <div className="min-h-screen bg-premium-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Success badge */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-accent-hover" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-primary-text">Payment Successful!</h1>
          <p className="text-gray-600 text-sm mt-1">Your slot has been confirmed</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl border border-premium-border overflow-hidden shadow-sm">

          {/* Receipt Header */}
          <div className="bg-premium-accent px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-accent-light text-xs font-semibold uppercase tracking-wide">Receipt</p>
              <p className="text-white font-black text-base mt-0.5">TurfBook</p>
            </div>
            <div className="text-right">
              <p className="text-accent-light text-xs">Booking ID</p>
              <p className="text-white font-mono text-xs mt-0.5 break-all">{String(bookingId).slice(-10)}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="px-6 py-5 space-y-3 border-b border-dashed border-premium-border">
            <Row label="Turf" value={turfName} />
            <Row label="Date" value={date} />
            <Row label="Time Slot" value={`${startTime} — ${endTime}`} />
            <Row label="Duration" value={`${duration} hr${duration !== 1 ? "s" : ""}`} />
            <Row label="Rate" value={`₹${pricePerHour}/hr`} />
          </div>

          {/* Amount */}
          <div className="px-6 py-4 border-b border-dashed border-premium-border">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm font-semibold">Subtotal</span>
              <span className="text-primary-text font-semibold">₹{amount}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600 text-sm font-semibold">Platform Fee</span>
              <span className="text-premium-accent font-semibold text-sm">FREE</span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-premium-border">
              <span className="text-primary-text font-black text-base">Total Paid</span>
              <span className="text-premium-accent font-black text-2xl">₹{amount}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="px-6 py-5 space-y-3 bg-premium-secondary">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Payment Info</p>
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
            className="flex-1 py-3 border border-premium-border rounded-xl text-primary-text text-sm font-bold hover:bg-premium-secondary transition">
            Book Another
          </button>
          <button
            onClick={() => navigate("/my-bookings")}
            className="flex-1 premium-btn-primary">
            My Bookings
          </button>
        </div>

        {/* Print hint */}
        <p className="text-center text-gray-600 text-xs mt-4">
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
      <span className="text-gray-600 shrink-0">{label}</span>
      <span className={`text-right break-all font-semibold ${
        mono ? "font-mono text-xs text-gray-700" :
        success ? "text-premium-accent" :
        "text-primary-text"
      }`}>
        {value}
      </span>
    </div>
  );
}

export default BookingReceipt;
