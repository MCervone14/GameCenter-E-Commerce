"use client";

import { motion } from "framer-motion";
import GreenCheck from "@/public/greencheck.png";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

const OrderConfirmed = () => {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 rounded-md text-center">
        <h1 className="text-xl font-medium">
          Your order has been successfully placed!
        </h1>
        <h2 className="text-sm my-4">
          Check your email for a copy of the receipt
        </h2>
        <Image
          src={GreenCheck}
          alt="Green Check Mark by Vecteezy"
          className="my-12"
        />
        <div className="flex items-center justify-center gap-12">
          <Link href={"/dashboard"}>
            <button
              onClick={() => {
                setTimeout(() => {
                  cartStore.setCheckout("cart");
                }, 1000);
                cartStore.toggleCart();
              }}
              className="font-medium btn btn-accent text-accent-content"
            >
              Check your Order(s)
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmed;
