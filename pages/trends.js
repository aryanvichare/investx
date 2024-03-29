import SidePanel from '@/components/SidePanel';
import { useAuth } from '@/lib/auth';
import StockArticles from '@/components/StockArticles';
import Navbar from '@/components/dashboard/Navbar';

const LoadingDashboard = () => (
  <div className="h-screen">
    <svg
      className="animate-spin h-8 w-8 m-4 text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
);

const Trends = () => {
  const auth = useAuth();

  return (
    <div className="bg-gray-50 w-full">
      <div className="flex flex-row relative flex-no-wrap">
        <SidePanel auth={auth} />
        {!auth.user ? (
          <LoadingDashboard />
        ) : (
          <div className="flex-1 overflow-x-scroll py-12 dark:bg-gray-900">
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-4 pt-24">
              <h1 className="text-blue-600 text-left text-3xl font-semibold mb-12">
                Trends
              </h1>
              <StockArticles selectedStock={'GME'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trends;
