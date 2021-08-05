import { signIn } from "next-auth/client";
import React from "react";
import SvgGithub from "./SvgGithub";
import SvgGoogle from "./SvgGoogle";

export default function Button({ auth }) {
  return  (
    auth === "google" ?
    <button
      onClick={() => signIn(auth)}
      className="h-full w-full flex justify-center focus:outline-none"
    >
      <SvgGoogle />
      <span className="mx-2">Sign in with Google </span>
    </button>
   : 
    <button
      onClick={() => signIn(auth)}
      className="h-full w-full flex justify-center focus:outline-none"
    >
      <SvgGithub />
      <span className="mx-2">Sign in with GitHub </span>
    </button>
  )
}
