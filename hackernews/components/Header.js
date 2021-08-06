import Link from 'next/link';
import { FaSearch, FaEnvelope, FaFilter } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Header({ setSearchBarVisibility }) {
  const searchBarClass = 'flex place-content-center mt-2 ';
  const Router = useRouter();

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
            <button type="button" className="bg-yellow-300 text-black p-2 flex rounded-md">
              <span>
                <FaEnvelope className="top-0 mt-1 mr-2" />
              </span>{' '}
              Subscribe to Newsletter
            </button>
          ) : (
            ''
          )}
        </div>
        <div className="bg-white text-sm px-6 py-3 flex place-content-evenly">
          <section className="space-x-6  ">
            <Link href="/">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1"> Home </span>
            </Link>
            <Link href="/user/create-post">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                {' '}
                New Article{' '}
              </span>
            </Link>
            <Link href="/">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1"> Login </span>
            </Link>
            <Link href="/">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                {' '}
                Malware{' '}
              </span>
            </Link>

            <Link href="/">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1"> Jobs </span>
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
        </div>
      </header>
    </>
  );
}
