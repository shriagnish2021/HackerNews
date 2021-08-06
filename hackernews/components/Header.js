
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { FaSearch, FaBars, FaEnvelope, FaUser } from "react-icons/fa";
import { useState } from "react";
import Login from "../pages/login";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Header({ setSearchBarVisibility }) {
  const [visibility, setVisibility] = useState(false);
  const [login, setlogin] = useState(false);
  const [session, loading] = useSession();
  const searchBarClass = "flex place-content-center mt-2 ";
  const Router = useRouter();


  function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
  }
  return (
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

        {Router.asPath === '/' ? (
            <button type="button" className="bg-yellow-300 text-black p-2 flex rounded-md"
          onClick={()=>handleScroll()} >
              <span>
                <FaEnvelope className="top-0 mt-1 mr-2" />
              </span>{' '}
              Subscribe 
            </button>
          ) : (
            ''
          )}
      <div>

      
        {login ? <Login setlogin={setlogin} /> : null}
        
        {session && !loading ? (
          <>
         
          <span>{session.user.image?<img src={session.user.image} alt="user-png" className="h-5" />:<FaUser /> }{session.user.userName}</span>
          <button onClick={() => signOut()} className="ml-4" > Logout</button>
        </>
         
        ) : (
          <button onClick={() => setlogin(true)}>Login</button>
        )}
        </div>
          
      </div>

      <div className="bg-white text-sm px-6 py-3 flex place-content-evenly">
        <section className="space-x-6  ">
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
          <Link href="/postJob">
            <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
              Post Job
            </span>
          </Link>
         
          <Link href="/Jobs">
                <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                  Jobs
                </span>
              </Link>
        </section>
        {Router.asPath === '/' ? (
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
                          searchWithinDateRange: !prevState.searchWithinDateRange,
                        }
                      : {
                          ...prevState,
                          searchWithinDateRange: !prevState.searchWithinDateRange,
                        }
                  )
                }
              >
                <FaFilter />
              </button>
            </section>
          ) : (
            ''
          )}
    </header>
</>
  );
}
