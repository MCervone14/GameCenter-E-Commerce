"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/formatPrice";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

const Cart = () => {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25 cart"
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-secondary-content absolute right-0 top-0 w-full lg:w-[30%] h-screen p-12 overflow-y-auto"
      >
        {cartStore.onCheckout === "cart" && (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm font-bold pb-12"
          >
            Back to Store
          </button>
        )}
        {cartStore.onCheckout === "checkout" && (
          <button
            onClick={() => cartStore.setCheckout("cart")}
            className="text-sm font-bold pb-12"
          >
            Back to Cart
          </button>
        )}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div layout className="flex py-4 gap-4" key={item.id}>
                <Image
                  className="rounded-md"
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                />
                <motion.div layout>
                  <h2>{item.name}</h2>
                  <div className="flex gap-2">
                    <h2>Quantity: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className="text-sm">
                    {item.unit_amount && formatPrice(item.unit_amount)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </>
        )}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <motion.div layout>
            <p className="text-bold">Total: {formatPrice(totalPrice)}</p>
            <button
              onClick={() => cartStore.setCheckout("checkout")}
              className="py-2 mt-4 bg-accent w-full rounded-md"
            >
              Checkout
            </button>
          </motion.div>
        ) : null}
        {cartStore.onCheckout === "checkout" && <Checkout />}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
            >
              <p className="text-2xl py-2">Your GameCenter Cart is Empty!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
