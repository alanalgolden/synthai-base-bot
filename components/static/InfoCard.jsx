import React from "react";
import { googleSignIn } from "../../functions/firebase/googleSignIn";
import GoogleSignInButton from "../blocks/SignInWithGoogle";

const InfoCard = () => {
  return (
    <div className="p-2 md:px-8 md:py-4 rounded bg-[#25252d] w-full max-h-[50%] overflow-hidden">
      <div className="flex justify-between">
        <h1 className="text-2xl mb-4">🤖 SynthAI Base Bot</h1>
        <GoogleSignInButton />
      </div>
      <ul>
        <li className="text-l">
          🖲️ This is the base of the custom bot for SynthAI.
          <span className="ml-2"></span>
        </li>
      </ul>
    </div>
  );
};

export default InfoCard;
