export const pineconeFetch = async (id) => {
  try {
    const response = await fetch("/api/pinecone/pineconeFetch", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ids: id,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
