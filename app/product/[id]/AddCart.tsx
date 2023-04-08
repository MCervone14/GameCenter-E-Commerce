"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/types";

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
  const cartStore = useCartStore();
  return (
    <button
      onClick={() =>
        cartStore.addProduct({ id, image, unit_amount, quantity, name })
      }
      className="my-4 btn btn-secondary w-full lg:w-1/5"
    >
      Add to Cart
    </button>
  );
};

export default AddCart;
