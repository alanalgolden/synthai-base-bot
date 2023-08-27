"use client";

import ChatWindow from "../components/blocks/ChatWindow";
import InfoCard from "../components/static/InfoCard";
import { UserProvider } from "../context/UserContext/context";

export default function Home() {
  return (
    <>
      <UserProvider>
        <InfoCard />
        <ChatWindow titleText="Hello!" />
      </UserProvider>
    </>
  );
}
