"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const placeholderDef = "How can I help?";

  return (
    <div className="bg-slate-900 flex justify-center h-screen">
      <div className="border-slate-500 border-4 rounded-md  mt-4 w-full max-w-5xl max-h-[80%] flex flex-col">
        <div className="flex-grow overflow-scroll">
          {messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? (
                <div className="pl-2 pt-2 pb-4 bg-slate-800">
                  {"User: "}
                  {m.content}
                </div>
              ) : (
                <div className="pl-2 pt-2 pb-4 bg-slate-600">
                  {"AI: "}
                  {m.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-slate-500 px-4 ">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              className="flex-grow my-4 py-2 pl-2 rounded-md bg-slate-700"
              value={input}
              placeholder={placeholderDef}
              onChange={handleInputChange}
            />
            <button
              className="py-2 px-4 ml-2 rounded-md bg-slate-600"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
