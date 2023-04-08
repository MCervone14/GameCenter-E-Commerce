"use client";

import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";
import formatPrice from "@/util/formatPrice";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({ elements, redirect: "if_required" })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout("success");
        }
        setIsLoading(false);
      });
  };

  return (
    <>
      <form className="mb-5" id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <h1 className="py-4 text-sm font-bold"> Total: {formattedPrice}</h1>
        <button
          className={`py-2 mt-4 w-full bg-teal-700 rounded-md text-white disabled:opacity-25`}
          id="submit"
          disabled={isLoading || !stripe || !elements}
        >
          <span id="button-text">
            {isLoading ? <span>Processing</span> : <span>Pay Now</span>}
          </span>
        </button>
      </form>
      <p className="text-sm">
        Tip: To &#34;process&#34; your fake transaction, type 4242 4242 4242
        4242 in the card number field and any dummy data for the rest.
      </p>
    </>
  );
};

export default CheckoutForm;
