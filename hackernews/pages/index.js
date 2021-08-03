import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import ArticleSection from '../components/ArticleSection';

export default function Home() {
  return (
    <>
      <Header />
      <ArticleSection />
    </>
  );
}
