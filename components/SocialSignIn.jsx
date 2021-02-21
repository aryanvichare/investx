import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/lib/auth';

const SocialSignIn = ({ setOpen }) => {
  const auth = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      className="fixed inset-0 z-50 overflow-auto h-screen w-full flex flex-row items-center justify-center md:px-0 px-12"
    >
      <div className="z-20 bg-white shadow-lg rounded-sm relative p-4 w-full max-w-xs m-auto flex-col flex border-green-500 border-t-4 pb-8">
        <svg
          className="w-6 h-6 absolute top-4 right-4 text-gray-300 cursor-pointer"
          onClick={() => setOpen(false)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div class="flex flex-col justify-center items-center w-full p-4">
          <h1 class="text-3xl text-gray-800 text-center font-medium mb-4">
            Sign in to
          </h1>
          <div className="flex flex-row items-center space-x-2 pr-1">
            <Image src="/images/logo.png" alt="me" width="50" height="50" />
            <h1 className="lg:ml-2 text-gray-900 font-bold text-3xl">
              Invest<span className="text-green-400">X</span>
            </h1>
          </div>
          <p class="text-center text-md mt-4 text-gray-600">
            Log in to get access to InvestX's custom dashboard
          </p>
        </div>
        <div class="mt-4 flex flex-col space-y-4 justify-center">
          <button
            onClick={() => auth.signInWithGoogle()}
            class="bg-blue-500 w-full flex flex-row justify-center items-center rounded shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <div className="bg-white inline-block p-2 rounded m-1">
              <FcGoogle size={32} />
            </div>
            <span class="mx-auto pr-8 text-lg text-white">Google</span>
          </button>
          <button
            onClick={() => auth.signInWithGithub()}
            class="bg-gray-900 w-full flex flex-row justify-center items-center rounded shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <div className="bg-transparent inline-block p-2 rounded m-1">
              <FaGithub fill="white" size={32} />
            </div>
            <span class="mx-auto pr-8 text-lg text-white">GitHub</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialSignIn;
