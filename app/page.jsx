"use client";

import ChatWindow from "../components/blocks/ChatWindow";
import InfoCard from "../components/static/InfoCard";
import { MessageProvider } from "../context/MessageContext/context";
import { UserProvider } from "../context/UserContext/context";

export default function Home() {
  return (
    <>
      <UserProvider>
        <MessageProvider>
          <div className="h-screen bg-slate-900">
            <InfoCard />
            <ChatWindow titleText="Hello!" />
            <div className="flex mt-4 justify-center">
              Copyright ©&nbsp;<a className="text-cyan-100">Synth AI</a>.
              Developed by&nbsp;
              <a
                className="text-cyan-100"
                href="https://github.com/alanalgolden"
              >
                alanalgolden
              </a>
              .
            </div>
          </div>
        </MessageProvider>
      </UserProvider>
    </>
  );
}
