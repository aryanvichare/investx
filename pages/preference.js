import { useState, useEffect } from 'react';
import ImpactCardPreference from '@/components/ImpactCardPreference';
import SidePanel from '@/components/SidePanel';
import { useAuth } from '@/lib/auth';
import { fetchUserData, updateImpactPreference } from '@/lib/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoadingDashboard = () => (
  <div className="h-screen">
    <svg
      class="animate-spin h-8 w-8 m-4 text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
);

const Dashboard = () => {
  const [selectedImpact, setSelectedImpact] = useState('');
  const auth = useAuth();

  const impactData = [
    {
      name: 'Broad Impact',
      desc:
        'With this option, you can invest in ETFs that support companies with lower carbon emissions and the funding of green projects',
      img: 'city.png'
    },
    {
      name: 'Climate Impact',
      desc:
        'With this option, you can invest in ETFs that support companies with lower carbon emissions and the funding of green projects.',
      img: 'climate.png'
    },
    {
      name: 'Social Impact',
      desc:
        'This offering is based on Broad Impact and adds two funds that support minority empowerment and gender diversity.',
      img: 'social.png'
    }
  ];

  const handleSelect = (e) => {
    while (!e.target.getAttribute('data-name') && e.parentElement) {
      e = e.parentElement;
    }

    const oldImpact = selectedImpact;
    const newImpact = e.target.getAttribute('data-name') ?? selectedImpact;
    setSelectedImpact(newImpact);

    if (oldImpact !== newImpact) {
      updateImpactPreference(auth?.user?.uid, newImpact);
      notify();
    }
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      const data = await fetchUserData(auth?.user?.uid);
      setSelectedImpact(data?.impact);
    };

    fetchPreferences();
  }, []);

  const notify = () => toast.info('Preference Successfully Updated!');

  return (
    <div className="bg-gray-50 w-full">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row relative flex-no-wrap">
        <SidePanel auth={auth} hScreen />
        {!auth.user ? (
          <LoadingDashboard />
        ) : (
          <div className="flex-1 overflow-x-scroll py-12">
            <div className="max-w-screen-xl mx-auto px-4 pt-24">
              <h1 class="text-blue-600 text-left text-3xl font-semibold mb-12">
                Preferences
              </h1>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-16 lg:gap-36">
                {impactData.map((el, idx) => (
                  <ImpactCardPreference
                    key={idx}
                    name={el?.name}
                    desc={el?.desc}
                    img={el?.img}
                    selected={
                      selectedImpact === el?.name.split(' ')[0].toLowerCase()
                    }
                    setSelectedImpact={handleSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
