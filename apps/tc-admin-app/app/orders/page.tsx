import { OrderStatusSelect } from "@/components/OrderStatusSelect";
import { listOrders } from "@/lib/api";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-SG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function OrdersAdminPage() {
  let orders: Awaited<ReturnType<typeof listOrders>> = [];
  let loadError: string | null = null;

  try {
    orders = await listOrders();
  } catch (error) {
    loadError = (error as Error).message;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Online Orders</h1>
        <p className="mt-1 text-sm text-black/50">
          Review paid and pending checkout orders.
        </p>
      </div>

      {loadError ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Could not load orders from the backend: {loadError}.
        </div>
      ) : null}

      {!loadError && orders.length === 0 ? (
        <p className="text-black/60">No online orders yet.</p>
      ) : null}

      {orders.length > 0 ? (
        <table className="w-full overflow-hidden rounded-lg border border-black/10 bg-white text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-black/50">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Fulfillment</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-black/5 align-top">
                <td className="px-4 py-3">
                  <div className="font-medium">
                    {formatMoney(order.totalCents)}
                  </div>
                  <div className="text-xs text-black/50">
                    {formatDate(order.createdAt)}
                  </div>
                </td>
                <td className="max-w-64 px-4 py-3 text-black/70">
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.quantity}x {item.name}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3 text-black/60">
                  <div>{order.fulfillmentType}</div>
                  <div>{order.address || "-"}</div>
                </td>
                <td className="px-4 py-3 text-black/60">
                  <div className="font-medium text-black">
                    {order.customerName}
                  </div>
                  <div>{order.phone}</div>
                  <div>{order.email || "-"}</div>
                </td>
                <td className="px-4 py-3 text-black/60">
                  <div>{order.paymentStatus}</div>
                  <div className="max-w-40 truncate text-xs">
                    {order.stripePaymentIntentId || "-"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <OrderStatusSelect id={order.id} status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
