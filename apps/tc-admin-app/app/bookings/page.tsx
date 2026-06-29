import { BookingStatusSelect } from "@/components/BookingStatusSelect";
import { listBookings } from "@/lib/api";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-SG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function BookingsAdminPage() {
  let bookings: Awaited<ReturnType<typeof listBookings>> = [];
  let loadError: string | null = null;

  try {
    bookings = await listBookings();
  } catch (error) {
    loadError = (error as Error).message;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Table Bookings</h1>
        <p className="mt-1 text-sm text-black/50">
          Review booking requests and update their status.
        </p>
      </div>

      {loadError ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Could not load bookings from the backend: {loadError}.
        </div>
      ) : null}

      {!loadError && bookings.length === 0 ? (
        <p className="text-black/60">No booking requests yet.</p>
      ) : null}

      {bookings.length > 0 ? (
        <table className="w-full overflow-hidden rounded-lg border border-black/10 bg-white text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-black/50">
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Party</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Notes</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-black/5 align-top"
              >
                <td className="px-4 py-3 font-medium">
                  {booking.customerName}
                </td>
                <td className="px-4 py-3">{formatDate(booking.bookedFor)}</td>
                <td className="px-4 py-3">{booking.partySize}</td>
                <td className="px-4 py-3 text-black/60">
                  <div>{booking.phone}</div>
                  <div>{booking.email}</div>
                </td>
                <td className="max-w-56 px-4 py-3 text-black/60">
                  {booking.notes || "-"}
                </td>
                <td className="px-4 py-3">
                  <BookingStatusSelect
                    id={booking.id}
                    status={booking.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
