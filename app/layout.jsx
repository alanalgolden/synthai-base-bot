import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import Sidebar from "../components/blocks/Sidebar";

const font = Roboto_Mono({
  subsets: ["cyrillic"],
  weight: ["700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Synth Base Chatbot</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        <meta
          name="description"
          content="Base Chatbot, custom built for SynthAI."
        />
        <meta property="og:title" content="Synth Base Chatbot" />
        <meta
          property="og:description"
          content="Base Chatbot, custom built for SynthAI."
        />
      </head>
      <body className={font.className}>
        <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800">
          <Sidebar />
        </div>
        {children}
      </body>
    </html>
  );
}
