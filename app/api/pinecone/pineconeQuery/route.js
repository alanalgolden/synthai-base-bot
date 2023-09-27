import { NextResponse } from "next/server";

export async function POST(req, res) {
  const reqData = await req.json();

  console.log(reqData.vector);
  const url = "https://base-bot-92d4948.svc.us-east4-gcp.pinecone.io/query";
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
      includeValues: reqData.includeValues,
      includeMetadata: reqData.includeMetadata,
      topK: reqData.topK,
      namespace: reqData.namespace,
      vector: reqData.vector,
      filter: reqData.filter ? reqData.filter : undefined,
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
