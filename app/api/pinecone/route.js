import seed from "app/api/pinecone/seed/seed";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  const { url, options } = await req.json();
  try {
    const documents = await seed(
      url,
      process.env.PINECONE_INDEX || process.env.NEXT_PUBLIC_PINECONE_INDEX
    );
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed crawling" });
  }
}
