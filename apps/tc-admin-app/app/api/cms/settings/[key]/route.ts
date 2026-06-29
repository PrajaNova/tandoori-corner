import { NextResponse } from "next/server";

import { saveSetting } from "@/lib/api";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  try {
    const { value } = (await request.json()) as { value: unknown };
    return NextResponse.json(await saveSetting(key, value));
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 400 },
    );
  }
}
