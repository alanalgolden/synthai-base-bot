"use client";

import { uuidv4 } from "@firebase/util";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import Sidebar from "../../../../components/blocks/Sidebar";
import { useMessage } from "../../../../context/MessageContext/context";
import { useUser } from "../../../../context/UserContext/context";
import { upsertDoc } from "../../firebase/upsertDoc/route";

export default function Chat() {
  // IMPORTED CONTEXT
  //const { user } = useUser();

  const { setMessage, message } = useMessage();

  // CHAT CONFIG
  const placeholderConfig = "How can I help?";

  //const collectionConfig = user?.uid;

  // STATES
  const [counter, setCounter] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  //const [uniqueId, setUniqueId] = useState(null);

  // FUNCTIONS
  const toggleFinished = () => {
    setIsFinished(true);
  };

  // CONVERSATION MANAGER
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: toggleFinished,
  });

  // Coming back to these, they are part of logging the conversation, I want to focus on Pinecone instead.
  /*   let data = {
    messageArray: [{ mCount: counter, mContent: messages[counter]?.content }],
  };

  const saveMessage = async () => {
    await upsertDoc(collectionConfig, uniqueId, data);
  };
 */

  //EFFECTS
  useEffect(() => {
    // Prevents infinite loop by not allowing function to run if messages[0] is still undefined.
    if (messages[counter]) {
      // LOGIC : If the user sent the message, then it doesn't need to wait for onFinished from text stream.
      if (messages[counter].role === "user") {
        setMessage(messages[counter]);
        setCounter((prevCounter) => prevCounter + 1);
      }
      // LOGIC : Prevents message from being set until it is fully finished, using the onFinish callback from chat stream.
      else if (messages[counter].role === "assistant" && isFinished === true) {
        setMessage(messages[counter]);
        setCounter((prevCounter) => prevCounter + 1);
        setIsFinished(false);
      }
    }
  }, [messages, isFinished]);

  return (
    <div className="bg-slate-900 w-[100%] flex justify-center overflow-scroll max-h-[80vh]">
      <div className="border-slate-500 border-4 rounded-md  mt-4 w-full max-w-5xl flex flex-col">
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
              placeholder={placeholderConfig}
              onChange={handleInputChange}
            />
            {/* <span className="...">Press ⮐ to send</span> */}
            <button
              className="py-2 px-4 ml-2 rounded-md bg-slate-600"
              type="submit"
            >
              Send
            </button>
            <button
              onClick={() => {
                console.log(message);
              }}
              className="py-2 px-4 ml-2 rounded-md bg-slate-600"
            >
              Test
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
