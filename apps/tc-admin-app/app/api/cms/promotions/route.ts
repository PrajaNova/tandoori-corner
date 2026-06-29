import { NextResponse } from "next/server";

import { savePromotion } from "@/lib/api";

export async function POST(request: Request) {
  try {
    return NextResponse.json(await savePromotion(await request.json()), {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
