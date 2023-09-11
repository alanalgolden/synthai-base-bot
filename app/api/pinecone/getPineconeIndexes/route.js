import getPineconeClient from "../../../../pineconeConfig";
import "server-only";

export async function GET(req) {
  const pinecone = await getPineconeClient();
  const indexes = await pinecone.listIndexes();

  console.log(indexes);
}
