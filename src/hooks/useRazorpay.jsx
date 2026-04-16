import { useEffect, useRef } from "react";

export const useRazorpay = () => {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    loaded.current = true;
  }, []);

  const openCheckout = (options) =>
    new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error("Razorpay SDK load nahi hua"));
        return;
      }
      const rzp = new window.Razorpay({
        ...options,
        // ✅ Sirf yeh — test mode mein config block kaam nahi karta
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        handler: resolve,
        modal: {
          ondismiss: () => reject(new Error("PAYMENT_CANCELLED")),
        },
      });
      rzp.open();
    });

  return { openCheckout };
};