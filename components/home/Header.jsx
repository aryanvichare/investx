import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/home/Navbar';
import SocialSignIn from '../SocialSignIn';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-blue-600">
      <Navbar />
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex flex-col md:flex-row justify-center items-center flex-wrap md:py-12 py-16">
          <div className="max-w-lg md:w-1/2">
            <div className="pb-8">
              <h1 className="text-white font-bold leading-2 text-5xl pb-4">
                Align your values and investments
              </h1>
              <p className="text-left text-white text-md leading-6">
                Invest in companies that align with the causes you care most
                about, without sacrificing your performance goals.
              </p>
            </div>
            <button
              onClick={() => {
                if (user) {
                  return router.push('/dashboard');
                }
                setOpen(true);
                console.log('activated');
              }}
              className="text-white bg-green-500 px-8 py-3 rounded-lg shadow-sm text-lg"
            >
              Get Started
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              className="md:ml-12 mt-6 md:mt-0 w-full"
              src="/images/hero-img.png"
              alt="Stocks"
            />
          </div>
        </div>
      </div>
      {open && <SocialSignIn setOpen={setOpen} />}
    </div>
  );
};

export default Header;
