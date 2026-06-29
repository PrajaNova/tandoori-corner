import { NextResponse } from "next/server";

import { updateBookingStatus } from "@/lib/api";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: unknown };
    if (typeof body.status !== "string") {
      return NextResponse.json(
        { message: "Booking status is required." },
        { status: 400 },
      );
    }
    await updateBookingStatus(
      id,
      body.status as "pending" | "confirmed" | "cancelled" | "completed",
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
