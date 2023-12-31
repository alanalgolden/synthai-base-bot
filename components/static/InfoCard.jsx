"use client";

import React from "react";
import LogoutButton from "../buttons/LogoutButton";
import GoogleSignInButton from "../buttons/SignInWithGoogle";
import { useUser } from "../../context/UserContext/context";

const InfoCard = () => {
  return (
    <div className="p-2 md:px-8 md:py-4 rounded bg-[#25252d] max-h-[50%]">
      <div className="flex justify-between">
        <h1 className="text-2xl mb-4">🤖 SynthAI Base Bot</h1>
        {/* TODO : Removed for now. {!user ? <GoogleSignInButton /> : <LogoutButton />} */}
      </div>
      <ul>
        <li className="text-l">
          This is the base of the custom bot for SynthAI.
          <span className="ml-2"></span>
        </li>
      </ul>
    </div>
  );
};

export default InfoCard;
