import Stripe from "stripe";
import Product from "./components/Product";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const products = await stripe.products.list();

  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      const categories = product.metadata.categories || "";
      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { categories },
      };
    })
  );
  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="flex flex-wrap gap-20 px-[50px] z-0">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
}
