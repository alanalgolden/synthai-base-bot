"use client";

import Footer from "../components/blocks/Footer";
import Sidebar from "../components/blocks/Sidebar";
import InfoCard from "../components/static/InfoCard";
import { MessageProvider } from "../context/MessageContext/context";
import { UserProvider } from "../context/UserContext/context";
import Chat from "./api/chat/useChat";

export default function Home() {
  return (
    <>
      <UserProvider>
        <MessageProvider>
          <div className="h-screen bg-slate-900">
            <div className="flex">
              <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800">
                <Sidebar />
              </div>

              <div
                className="flex-auto p-8 overflow-x-auto overflow-y-auto ml-64 min-w-[40rem] bg-slate-900"
                style={{ minHeight: "100vh", width: "max-content" }}
              >
                <div>
                  <InfoCard />
                  <Chat />
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </MessageProvider>
      </UserProvider>
    </>
  );
}
