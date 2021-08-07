/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */

import Link from "next/link";
import { FaSearch, FaBars, FaEnvelope, FaUser, FaFilter } from "react-icons/fa";
import { useState } from "react";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "../pages/login";
import FullPageLoader from "./FullPageLoader";
import DropItems from "./dropdown/DropItems";
import SvgDownArrow from "./Login/SvgDownArrow";

export default function Header({ setSearchBarVisibility }) {
  const [visibility, setVisibility] = useState(false);
  const [login, setlogin] = useState(false);
  const [session, loading] = useSession();
  const [drop, setdrop] = useState(false);
  const searchBarClass = "flex place-content-center mt-2 ";
  const Router = useRouter();

  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
  }

  function handleLogin() {
    window.history.pushState({}, "home", window.location.href);
    setlogin(true);
  }
  return loading ? (
    <FullPageLoader />
  ) : (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hacker News</title>
        <link rel="icon" href="/images/logo.png" type="image/icon type" />
      </Head>

      <header className="">
        <div className="bg-blue-800 text-white px-6 py-5 flex place-content-evenly ">
          <h1 className="text-4xl font-black ">
            <Link href="/">The Hacker News</Link>
          </h1>

          {Router.asPath === "/" || Router.asPath === "/#" ? (
            <button
              type="button"
              className="bg-yellow-300 text-black p-2 flex rounded-md max-h-10"
              onClick={() => handleScroll()}
            >
              <span>
                <FaEnvelope className="top-0 mt-1 mr-2" />
              </span>
              Subscribe
            </button>
          ) : (
            ""
          )}
          <div>
            {login ? <Login setlogin={setlogin} /> : null}

            {session && !loading ? (
              <>
                <div onClick={() => setdrop(!drop)} className="inline-flex">
                  {drop ? <DropItems user={session.user.userName} /> : null}
                  <span>
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt="user-png"
                        className="w-10 rounded-full "
                      />
                    ) : (
                      <FaUser size={40} className="rounded-full p-1" />
                    )}
                  </span>
                  <span className="flex items-center">
                    <SvgDownArrow />
                  </span>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => handleLogin()}
                className="mt-1"
              >
                <span className="font-bold text-lg tracking-wide">Login</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white text-sm px-6 py-3 flex place-content-between w-3/5 mx-auto">
          <section className="space-x-6 ml-9 ">
            <Link href="/">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                Home
              </span>
            </Link>
            {session ? (
              <Link href="/user/create-post">
                <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                  New Article
                </span>
              </Link>
            ) : null}
            {session ? (
              <Link href="/postJob">
                <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                  Post Job
                </span>
              </Link>
            ) : null}
            <Link href="/jobs">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                Jobs
              </span>
            </Link>
          </section>
          {Router.asPath === "/" || Router.asPath === "/#" ? (
            <section className="space-x-6">
              <button
                type="button"
                onClick={() =>
                  setSearchBarVisibility((prevState) =>
                    prevState.searchWithinDateRange
                      ? {
                          search: !prevState.search,
                          searchWithinDateRange: false,
                        }
                      : {
                          ...prevState,
                          search: !prevState.search,
                        }
                  )
                }
              >
                <FaSearch />
              </button>

              <button
                type="button"
                onClick={() =>
                  setSearchBarVisibility((prevState) =>
                    prevState.search
                      ? {
                          search: false,
                          searchWithinDateRange:
                            !prevState.searchWithinDateRange,
                        }
                      : {
                          ...prevState,
                          searchWithinDateRange:
                            !prevState.searchWithinDateRange,
                        }
                  )
                }
              >
                <FaFilter />
              </button>
            </section>
          ) : (
            ""
          )}
        </div>
      </header>
    </>
  );
}
