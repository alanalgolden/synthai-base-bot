import { MessageProvider } from "../context/MessageContext/context";
import { UserProvider } from "../context/UserContext/context";

import Chat from "./api/chat/useChat";
import Homepage from "./pages/home/page";
/* import getPineconeIndexes from "./util/getPineconeIndexes/util"; */

export default function Home() {
  /*   const testPine = async () => {
    getPineconeIndexes();
  }; */

  return (
    <>
      <UserProvider>
        <MessageProvider>
          <Homepage />
        </MessageProvider>
      </UserProvider>
    </>
  );
}
