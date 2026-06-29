import { EventEnquiryStatusSelect } from "@/components/EventEnquiryStatusSelect";
import { listEventEnquiries } from "@/lib/api";

export const dynamic = "force-dynamic";

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-SG", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default async function EventEnquiriesAdminPage() {
  let enquiries: Awaited<ReturnType<typeof listEventEnquiries>> = [];
  let loadError: string | null = null;

  try {
    enquiries = await listEventEnquiries();
  } catch (error) {
    loadError = (error as Error).message;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Event Enquiries</h1>
        <p className="mt-1 text-sm text-black/50">
          Review TCB Bar private event enquiries.
        </p>
      </div>

      {loadError ? (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          Could not load event enquiries from the backend: {loadError}.
        </div>
      ) : null}

      {!loadError && enquiries.length === 0 ? (
        <p className="text-black/60">No event enquiries yet.</p>
      ) : null}

      {enquiries.length > 0 ? (
        <table className="w-full overflow-hidden rounded-lg border border-black/10 bg-white text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-black/50">
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Notes</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr
                key={enquiry.id}
                className="border-b border-black/5 align-top"
              >
                <td className="px-4 py-3 font-medium">
                  {enquiry.customerName}
                </td>
                <td className="px-4 py-3">
                  <div>{enquiry.eventType}</div>
                  <div className="text-black/50">
                    {enquiry.guestCount} guests
                  </div>
                </td>
                <td className="px-4 py-3">
                  {formatDate(enquiry.preferredDate)}
                </td>
                <td className="px-4 py-3 text-black/60">
                  <div>{enquiry.phone}</div>
                  <div>{enquiry.email}</div>
                </td>
                <td className="max-w-56 px-4 py-3 text-black/60">
                  {enquiry.notes || "-"}
                </td>
                <td className="px-4 py-3">
                  <EventEnquiryStatusSelect
                    id={enquiry.id}
                    status={enquiry.status}
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
