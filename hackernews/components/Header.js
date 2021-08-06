import Link from 'next/link';
import { FaSearch, FaBars, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const [visibility, setVisibility] = useState(false);
  const searchBarClass = 'flex place-content-center mt-2 ';
  const Router = useRouter();

  return (
    <>
      {/*  <head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hacker News</title>
      </head> */}
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
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                {' '}
                Login{' '}
              </span>
            </Link>
            <Link href="/">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1">
                {' '}
                Malware{' '}
              </span>
            </Link>

            <Link href="/jobs">
              <span className=" border-transparent  border-b-4 cursor-pointer hover:border-blue-800 p-1"> Jobs </span>
            </Link>
          </section>
          <section className="space-x-6">
            {/*  <button type="button" onClick={() => setVisibility((prevState) => !prevState)}>
              <FaSearch />
            </button> */}

            <button type="button">
              <FaBars />
            </button>
          </section>
        </div>
        <div className={`${searchBarClass} ${visibility ? 'block' : 'hidden'}`}>
          <input type="text" placeholder="Search Here" className="border-gray-400 border-2  p-1 rounded mr-4 w-1/6 " />
          <div>
            <span> Sort by date:&nbsp; </span>
            <input
              type="date"
              id="date"
              name="date"
              className="border-gray-400 border-2  p-1 rounded "
              placeholder="dd/aa/bbbb"
            />
          </div>
        </div>
      </header>
    </>
  );
}