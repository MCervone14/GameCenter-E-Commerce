import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/formatPrice";

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: {
      //@ts-ignore
      userId: user?.user?.id,
    },
    include: {
      products: true,
    },
  });
  return orders;
};

const DashboardPage = async () => {
  const orders = await fetchOrders();

  if (orders === null) {
    return <div>You need to be logged in to view your orders!</div>;
  }

  if (orders.length === 0) {
    return (
      <div>
        <h1>No Orders</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl p-2 text-center">Order History</h1>
      <div className="font-medium">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col w-full justify-between items-center gap-5 p-4 my-4 bg-secondary-content rounded-md lg:flex-row"
          >
            <h2 className="text-xs font-medium py-2">Order Id: {order.id}</h2>
            <p className="text-xs py-2">
              Status:
              <span
                className={`${
                  order.status === "complete" ? "bg-green-700" : "bg-yellow-500"
                } text-white rounded-md p-2 mx-2 text-xs`}
              >
                {order.status}
              </span>
            </p>

            <p className="text-xs py-2">
              Time: {new Date(order.createdDate).toDateString()}
            </p>
            <div className="text-sm p-4">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="gap-4">
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text">Total: {formatPrice(order.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
