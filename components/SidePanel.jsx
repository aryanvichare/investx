import Image from 'next/image';
import { useRouter } from 'next/router';

const SidePanel = ({ auth, hScreen }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`hidden lg:block lg:flex-shrink-0 bg-blue-600 w-48 lg:w-64 ${
          hScreen && 'h-screen'
        }`}
      >
        <div className="px-4 py-16">
          <div className="flex flex-row justify-start items-center lg:pl-4">
            <Image src="/images/logo.png" alt="me" width="50" height="50" />
            <h1 className="lg:ml-2 text-white font-bold text-3xl">
              Invest<span className="text-green-400">X</span>
            </h1>
          </div>
        </div>
        <div className="mt-6">
          <ul className="w-full">
            <li
              onClick={() => router.push('/dashboard')}
              className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium pr-4"
            >
              Stocks
            </li>
            <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium pr-4">
              Trends
            </li>
            <li
              onClick={() => router.push('/preference')}
              className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium pr-4"
            >
              Preference
            </li>
            <li
              onClick={() => auth.signOut()}
              className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium pr-4"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`block lg:hidden lg:flex-shrink-0 bg-blue-600 w-24 ${
          hScreen && 'h-screen'
        }`}
      >
        <div className="px-4 py-16">
          <div className="flex flex-row justify-center items-center ">
            <Image src="/images/logo.png" alt="me" width="50" height="50" />
          </div>
        </div>
        <div className="mt-6">
          <ul className="w-full">
            <li
              onClick={() => router.push('/dashboard')}
              className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center"
            >
              <svg
                className="w-8 h-8 text-center"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </li>
            <li className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center">
              <svg
                className="w-8 h-8 text-center"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </li>
            <li
              onClick={() => router.push('/preference')}
              className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center"
            >
              <svg
                className="w-8 h-8 text-center"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856ZM20.4933 4.89833C21.3244 4.89833 22 5.56203 22 6.37856C22 7.19618 21.3244 7.85989 20.4933 7.85989H13.9178C13.0856 7.85989 12.4101 7.19618 12.4101 6.37856C12.4101 5.56203 13.0856 4.89833 13.9178 4.89833H20.4933ZM3.50777 15.958H10.0833C10.9155 15.958 11.5911 16.6217 11.5911 17.4393C11.5911 18.2558 10.9155 18.9206 10.0833 18.9206H3.50777C2.67555 18.9206 2 18.2558 2 17.4393C2 16.6217 2.67555 15.958 3.50777 15.958ZM18.5611 20.7778C20.4611 20.7778 22 19.2648 22 17.3992C22 15.5325 20.4611 14.0196 18.5611 14.0196C16.6623 14.0196 15.1223 15.5325 15.1223 17.3992C15.1223 19.2648 16.6623 20.7778 18.5611 20.7778Z"
                  fill="white"
                />
              </svg>
            </li>
            <li
              onClick={() => auth.signOut()}
              className="hover:bg-blue-700 py-6 text-center cursor-pointer text-white text-lg font-medium flex justify-center"
            >
              <svg
                className="w-8 h-8 text-center"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
