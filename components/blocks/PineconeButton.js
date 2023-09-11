"use client";
import { useState } from "react";

const PineconeButton = () => {
  const [test, setTest] = useState("");

  async function handleButts() {
    const response = await fetch("/api/pinecone/getPineconeIndexes", {});
  }

  async function handlePost() {
    const response = await fetch("api/pinecone/addToIndex");
  }

  return (
    <div className="flex  mt-4 justify-center">
      <button className="bg-slate-700 p-2 rounded-md" onClick={handleButts}>
        Test Button
      </button>
      <button className="bg-slate-700 p-2 rounded-md" onClick={handlePost}>
        Test Button 2
      </button>
    </div>
  );
};

export default PineconeButton;
