export const pineconeQuery = async ({
  namespace,
  topK,
  filter,
  includeValues,
  includeMetadata,
  vector,
}) => {
  try {
    console.log(filter);
    const response = await fetch("/api/pinecone/pineconeQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        topK: topK,
        filter: filter,
        includeValues: includeValues,
        includeMetadata: includeMetadata,
        vector: vector,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
