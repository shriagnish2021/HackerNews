/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { FaSearch, FaBars, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import Login from "../pages/login";
import { signOut, useSession } from "next-auth/client";

export default function Header() {
  const [visibility, setVisibility] = useState(false);
  const [login, setlogin] = useState(false);
  const [session, loading] = useSession();
  const searchBarClass = "flex place-content-center mt-2 ";

  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
  }
  return (
    <header className="">
      <div className="bg-blue-800 text-white px-6 py-5 flex place-content-evenly ">
        <h1 className="text-4xl font-black ">
          <Link href="/">The Hacker News</Link>
        </h1>

        <button
          type="button"
          className="bg-yellow-300 text-black p-2 flex rounded-md"
          onClick={handleScroll}
        >
          <span>
            <FaEnvelope className="top-0 mt-1 mr-2" />
          </span>
          Subscribe to Newsletter
        </button>
        {login ? <Login setlogin={setlogin} /> : null}
        {!session ? (
          <button onClick={() => setlogin(true)}>login</button>
        ) : (
          <>
            
            <span>welcome {session.user.name}</span>
            <button onClick={() => signOut()}>logout</button>
          </>
        )}
      </div>

      <div className="bg-white text-sm px-6 py-3 flex place-content-evenly">
        <section className="space-x-6  ">
          <Link href="/">
            <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
              
              Home
            </span>
          </Link>
          <Link href="/user/create-post">
            <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
              New Article
            </span>
          </Link>
          <Link href="/">
            <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
              Vulnerabilities
            </span>
          </Link>
          <Link href="/">
            <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
              
              Malware
            </span>
          </Link>

          <Link href="/postJob">
            <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
              
              Jobs
            </span>
          </Link>
        </section>
        <section className="space-x-6">
          <button type="button" onClick={() => setVisibility(!visibility)}>
            <FaSearch />
          </button>

          <button type="button">
            <FaBars />
          </button>
        </section>
      </div>
      <div className={`${searchBarClass} ${visibility ? "block" : "hidden"}`}>
        <input
          type="text"
          placeholder="Search Here"
          className="border-gray-400 border-2 w-7/12 p-1 rounded  "
        />
      </div>
    </header>
  );
}
