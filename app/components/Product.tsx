import Image from "next/image";
import formatPrice from "@/util/formatPrice";
import { ProductType } from "@/types/types";
import Link from "next/link";

const Product = ({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) => {
  const { categories } = metadata;
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: {
          name,
          image,
          unit_amount,
          id,
          description,
          categories,
        },
      }}
    >
      <div className="relative group ">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-full h-96 object-cover hover:opacity-50 -z-0"
          priority
        />
        <h2 className="text-white absolute text-2xl transition-all duration-1000 bottom-0 opacity-0 group-hover:opacity-100 w-full text-center bg-secondary-content py-4">
          Price:{" "}
          {unit_amount !== null ? formatPrice(unit_amount) : "No Sale Price"}
        </h2>
      </div>
    </Link>
  );
};

export default Product;
