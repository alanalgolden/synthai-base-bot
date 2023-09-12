"use client";
import axios from "axios";
import { useState } from "react";
import getEmbeddings from "../../app/api/openai/getEmbeddings/route";

const PineconeButton = () => {
  const [test, setTest] = useState("");

  async function handleButts() {
    const response = await fetch("/api/pinecone/getPineconeIndexes", {});
  }

  /* 
  async function handlePost() {
    const response = await fetch("api/pinecone/addToIndex");
  } */

  async function handleGet() {
    const apiKey = "766d8cf2-aa7c-43c2-b70d-7141418ad66e";

    const embedding = await getEmbeddings(
      "This is a test embedding, to see if I can get to two vectors!"
    );

    const options = {
      method: "POST",
      url: "/api/vectors/upsert",
      headers: {
        accept: `application/json`,
        "content-type": `application/json`,
        "Api-Key": "7b95a4a4-a395-4d6e-9fe7-5f12c41085b6",
      },
      data: {
        vectors: [
          {
            id: "A",
            values: embedding,
          },
        ],
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex  mt-4 justify-center">
      <button className="bg-slate-700 p-2 rounded-md" onClick={handleButts}>
        Test Button
      </button>
      <button className="bg-slate-700 p-2 rounded-md" onClick={handleGet}>
        Test Button 2
      </button>
    </div>
  );
};

export default PineconeButton;
