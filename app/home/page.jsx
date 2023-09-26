import Footer from "../../components/blocks/Footer";
import InfoCard from "../../components/static/InfoCard";
import { MessageProvider } from "../../context/MessageContext/context";
import Chat from "../api/chat/useChat";

export default function Homepage() {
  return (
    <div className="h-screen bg-slate-900">
      <div className="flex">
        <div
          className="flex-auto p-8 overflow-x-auto overflow-y-auto ml-64 min-w-[40rem] bg-slate-900"
          style={{ minHeight: "100vh", width: "max-content" }}
        >
          <div>
            <InfoCard />
            <MessageProvider>
              <Chat />
            </MessageProvider>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
