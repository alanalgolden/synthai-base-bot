import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Synth Base Chatbot</title>
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
