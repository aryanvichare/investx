import { useAuth } from '@/lib/auth';
import { useStock } from '@/lib/stock';
import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/Header';
import Impact from '@/components/Impact';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';

export default function Home() {
  const auth = useAuth();
  const stock = useStock();
  const { user, email } = auth;

  return (
    <div>
      <Head>
        <title>InvestX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Impact />
      <Banner />
      <Footer />
    </div>
  );
}
