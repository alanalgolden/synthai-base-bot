import { MessageProvider } from "../context/MessageContext/context";
import { UserProvider } from "../context/UserContext/context";
import Homepage from "./home/page";

export default function Home() {
  return (
    <>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </>
  );
}
