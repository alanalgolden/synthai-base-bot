"use client";

const VectorCard = ({ data }) => {
  return (
    <div className="mt-4 w-full">
      <div className="flex-col  bg-slate-800 p-8 rounded-md">
        <h2>Vector Text: {data.metadata.input}</h2>
        <p>Copy Type: {data.metadata.copyType}</p>
        <p>Vector ID: {data.id}</p>
        <p>Relationship Score: {data.score}</p>
      </div>
    </div>
  );
};

export default VectorCard;
