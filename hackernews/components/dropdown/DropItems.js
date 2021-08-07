import { signOut } from "next-auth/client";
import Link from "next/link";
import React from "react";

export default function DropItems({ user }) {
  return (
    <ul className="absolute top-16 text-gray-700 pt-1">
      <li>
        <Link href="/">
          <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
            {user}
          </a>
        </Link>
      </li>
      <li onClick={signOut}>
        <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
          Logout
        </a>
      </li>
    </ul>
  );
}
