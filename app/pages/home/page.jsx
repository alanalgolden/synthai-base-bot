import Footer from "../../../components/blocks/Footer";
import PineconeButton from "../../../components/blocks/pineconeButton";
import InfoCard from "../../../components/static/InfoCard";
import Chat from "../../api/chat/useChat";

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
            <Chat />
            <Footer />
            <PineconeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
