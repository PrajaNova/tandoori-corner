import { NextResponse } from "next/server";

import { createItem } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createItem(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
