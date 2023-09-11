import { getPineconeIndexes } from "./getPineconeIndexes/route";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const pinecone = await getPineconeIndexes();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
