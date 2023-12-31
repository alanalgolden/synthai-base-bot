import { NextResponse } from "next/server";

export async function POST(req, res) {
  const reqData = await req.json();
  const url =
    "https://base-bot-92d4948.svc.us-east4-gcp.pinecone.io/vectors/upsert";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Api-Key":
        process.env.NEXT_PUBLIC_PINECONE_API_KEY ||
        process.env.PINECONE_API_KEY,
    },

    body: JSON.stringify({
      vectors: [
        {
          id: reqData.id,
          values: reqData.embedding,
          metadata: reqData.metadata,
        },
      ],
    }),
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
