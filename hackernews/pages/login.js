/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */


import { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Button from "../components/Login/Button";

export default function Login() {
  const [open, setOpen] = useState(true);

  // format of data recieved
  //   user:
  // email: "email"
  // id: "uuid()"
  // image: "image_url"
  // name: "username"
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="mb-4 text-lg text-center leading-6 font-medium text-gray-900"
                      >
                        <img
                          src="https://media1.thehungryjpeg.com/thumbs2/ori_3657510_hwvooeuwwcps3h7j0zhfqj8lwsp01w4fz69epf1u_monogram-hn-logo-design.jpg"
                          className="h-2/4 text-center w-2/4 mx-auto "
                        ></img>
                      </Dialog.Title>
                      <Dialog.Title
                        as="h3"
                        className="my-6 text-2xl text-center leading-6  font-semibold text-gray-900"
                      >
                        Login
                      </Dialog.Title>

                      <div className="mt-2">
                        <p className="text-center text-base text-gray-500">
                          Login into HackerNews Blog with just a click away.
                          Click here for login/signup
                        </p>
                      </div>
                      <div className="mt-8 border-2 flex justify-center align-middle py-2 bg-gray-50">
                      <Button auth='google'/>
                      </div>
                      <div className="mt-4 border-2 flex justify-center align-middle py-2 bg-gray-50 focus:outline-none">
                        <Button auth="github" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
