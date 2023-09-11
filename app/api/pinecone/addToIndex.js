import { addToIndex } from "./addToIndex/route";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const pinecone = await addToIndex();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
