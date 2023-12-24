import { getCurrentUser } from "@/libs/session";
import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  try {
    if (!user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { title, content } = await req.json();

    const newPost = await prisma.post.create<object>({
      data: {
        title,
        content,
        authorEmail: user?.email,
      },
    });

    return NextResponse.json({ newPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
