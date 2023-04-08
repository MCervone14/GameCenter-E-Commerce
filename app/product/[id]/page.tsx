import { SearchParamType } from "@/types/types";
import formatPrice from "@/util/formatPrice";
import Image from "next/image";
import AddCart from "./AddCart";

const Product = async ({ searchParams }: SearchParamType) => {
  const categories = searchParams.categories.split(",");
  return (
    <div className="flex flex-col lg:flex-row md:flex-col items-center justify-between gap-12 p-12">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={400}
        height={400}
        priority
      />
      <div className="font-medium">
        <h2 className="text-3xl py-2 font-bold">{searchParams.name}</h2>
        <p className="py-2">{searchParams.description}</p>
        <h2 className="text-xl py-2">Categories</h2>
        {categories.map((category, index) => (
          <p className="btn bg-primary py-2 px-2 mr-2 mb-5" key={index}>
            {category}
          </p>
        ))}
        <div className="flex gap-2">
          <p className="font-bold">
            {searchParams.unit_amount !== null
              ? formatPrice(searchParams.unit_amount)
              : "No Sale Price"}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
};

export default Product;
