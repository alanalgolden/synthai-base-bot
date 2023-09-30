"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { useMessage } from "../../../../context/MessageContext/context";
import ReactMarkdown from "react-markdown";
import { useInspiration } from "../../../../context/InspirationContext/context";

export default function Chat() {
  // IMPORTED CONTEXT
  const { setMessage } = useMessage();
  const { inspiration } = useInspiration();

  // CHAT CONFIG
  const placeholderConfig = "How can I help?";

  // REACT
  const [counter, setCounter] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [waiting, setWaiting] = useState(true);

  // FUNCTIONS
  const toggleFinished = () => {
    setIsFinished(true);
  };

  const toggleWaiting = () => {
    setIsFinished(false);
  };

  // CONVERSATION MANAGER
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: toggleFinished,
  });

  // CONTROLS TEXT AREA SIZE
  const handleTextAreaChange = (e) => {
    handleInputChange(e);
    const lineHeight = 20; // Assume each line is approx 20px high. Adjust based on your styling
    const maxVisibleLines = 10;
    const currentLines = e.target.value.split("\n").length;

    // Set rows to the lesser of currentLines or maxVisibleLines
    e.target.rows = Math.min(currentLines, maxVisibleLines);
  };

  // EFFECTS
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

  // STYLING
  const markdownStyles = {
    h1: "text-2xl font-bold mb-2",
    h2: "text-xl font-bold mb-1",
    h3: "text-lg font-bold",
    h4: "text-base font-semibold",
    // Add more styles as needed
  };

  return (
    <div className="bg-slate-900 w-full flex justify-center   max-h-[80vh]">
      <div className="border-slate-500 border-4 rounded-md  mt-4 min-w-[30rem] w-[60rem] flex flex-col">
        <div className="flex-grow overflow-y-scroll">
          {messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? (
                <div className="px-2 pt-2 pb-4 bg-slate-800 whitespace-pre-line">
                  <p className="text-blue-500">{"User: "}</p>
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className={markdownStyles.h1} {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className={markdownStyles.h2} {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className={markdownStyles.h3} {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <h1 className={markdownStyles.h4} {...props} />
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="pl-2 pt-2 pb-4 bg-slate-600 whitespace-pre-line">
                  <p className="text-green-500">{"AI: "}</p>
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className={markdownStyles.h1} {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className={markdownStyles.h2} {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className={markdownStyles.h3} {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <h1 className={markdownStyles.h4} {...props} />
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                  <div className="bg-slate-700 flex-col p-2 rounded-md">
                    <p className="text-blue-400">Inspiration Vectors:</p>
                    <div>{inspiration}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-500 px-4 ">
          <form onSubmit={handleSubmit} className="flex items-center">
            <textarea
              className="flex-grow my-4 py-2 pl-2 rounded-md bg-slate-700 overflow-auto max-h-[200px]"
              rows="1"
              value={input}
              placeholder={placeholderConfig}
              onChange={handleTextAreaChange}
              style={{ resize: "none" }}
            />
            {/* <span className="...">Press ⮐ to send</span> */}
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
