export const pineconeDescribeIndex = async (index) => {
  try {
    const response = await fetch("/api/pinecone/pineconeDescribeIndex", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        index: index,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
