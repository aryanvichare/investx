import { useAuth } from '@/lib/auth';
import { useStock } from '@/lib/stock';
import Head from 'next/head';

export default function Home() {
  const auth = useAuth();
  const stock = useStock();
  const { user, email } = auth;
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold text-blue-500">InvestX Landing Page</h1>
      <p>{user ? user?.email : 'Logged out'}</p>
      <button
        onClick={(e) => auth.signInWithGoogle()}
        className="bg-blue-600 text-white"
      >
        Sign In With Google
      </button>
      <button
        onClick={(e) => auth.signInWithTwitter()}
        className="block bg-green-600 text-white mt-4"
      >
        Sign In With Twitter
      </button>
    </div>
  );
}
