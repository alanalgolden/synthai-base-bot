"use client";
import React from "react";
import { googleSignIn } from "../../functions/firebase/googleSignIn";

const GoogleSignInButton = () => {
  return (
    <button
      className="py-4 px-6 rounded-md font-extrabold bg-slate-600"
      onClick={googleSignIn}
    >
      Sign in
    </button>
  );
};

export default GoogleSignInButton;
