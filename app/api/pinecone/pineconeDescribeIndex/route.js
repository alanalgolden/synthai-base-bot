import { NextResponse } from "next/server";

export async function GET(req, res) {
  const reqData = await req;
  const index = reqData.headers.get("index");
  const url = `https://base-bot-92d4948.svc.us-east4-gcp.pinecone.io/databases/${index}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Api-Key":
        process.env.NEXT_PUBLIC_PINECONE_API_KEY ||
        process.env.PINECONE_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Sever Error" });
  }
}
