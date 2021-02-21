import Head from 'next/head';
import Header from '@/components/home/Header';
import Impact from '@/components/Impact';
import Banner from '@/components/home/Banner';
import Footer from '@/components/home/Footer';

export default function Home() {
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
