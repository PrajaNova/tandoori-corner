import { NextResponse } from "next/server";

import { updateEventEnquiryStatus } from "@/lib/api";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: unknown };
    if (typeof body.status !== "string") {
      return NextResponse.json(
        { message: "Event enquiry status is required." },
        { status: 400 },
      );
    }
    await updateEventEnquiryStatus(
      id,
      body.status as "new" | "contacted" | "confirmed" | "cancelled" | "closed",
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
