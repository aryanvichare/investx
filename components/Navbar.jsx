import React, { useState } from 'react';
import Image from 'next/image';
import SocialSignIn from './SocialSignIn';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <div className="mx-auto container relative px-6 xl:px-0">
      <nav>
        <div className="lg:flex justify-between w-full py-12 hidden">
          <div className="flex flex-row justify-start items-center lg:pl-4">
            <Image src="/images/logo.png" alt="me" width="50" height="50" />
            <h1 className="lg:ml-2 text-white font-bold text-3xl">
              Invest<span className="text-green-400">X</span>
            </h1>
          </div>
          <div className="flex">
            <ul className="font-normal text-lg flex space-x-16 justify-between items-center text-white">
              <li className="text-white cursor-pointer">
                <a>Home</a>
              </li>
              <li className="text-white cursor-pointer">
                <a
                  onClick={() => setOpen(true)}
                  className="hover:text-green-300 transition duration-200 ease-in-out"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="lg:hidden py-4">
        <div className="flex py-2 justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <Image src="/images/logo.png" alt="me" width="50" height="50" />
            <h1 className="lg:ml-2 text-white font-bold text-3xl">
              Invest<span className="text-green-400">X</span>
            </h1>
          </div>
          <div className=" flex items-center">
            {show && (
              <ul
                id="list"
                className=" py-2 mx-8 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-20 md:px-4 md:mt-20 z-20"
              >
                <li className="flex justify-center cursor-pointer text-gray-800 text-sm leading-3 tracking-normal py-2 hover:text-green-600 focus:text-green-600 focus:outline-none">
                  <a href="javascript:void(0)">
                    <span className="font-bold text-md">Home</span>
                  </a>
                </li>
                <li className="flex justify-center cursor-pointer text-gray-800 text-sm leading-3 tracking-normal py-2 hover:text-green-600 focus:text-green-600 focus:outline-none">
                  <a href="javascript:void(0)">
                    <span className="font-bold text-md">Get Started</span>
                  </a>
                </li>
              </ul>
            )}
            <div className="xl:hidden " onClick={() => setShow(!show)}>
              {show ? (
                <svg
                  className="text-white cursor-pointer"
                  aria-label="Close"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              ) : (
                <div className=" close-m-menu" onclick="MenuHandler(false)">
                  <svg
                    aria-haspopup="true"
                    aria-label="Main Menu"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white cursor-pointer"
                    width={28}
                    height={28}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={4} y1={8} x2={20} y2={8} />
                    <line x1={4} y1={16} x2={20} y2={16} />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {open && <SocialSignIn setOpen={setOpen} />}
    </div>
  );
};

export default Navbar;
