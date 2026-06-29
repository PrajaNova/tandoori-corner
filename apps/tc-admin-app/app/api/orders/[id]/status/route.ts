import { NextResponse } from "next/server";

import { updateOrderStatus } from "@/lib/api";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: unknown };
    if (typeof body.status !== "string") {
      return NextResponse.json(
        { message: "Order status is required." },
        { status: 400 },
      );
    }
    await updateOrderStatus(
      id,
      body.status as
        | "pending_payment"
        | "paid"
        | "confirmed"
        | "preparing"
        | "ready"
        | "completed"
        | "cancelled",
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
