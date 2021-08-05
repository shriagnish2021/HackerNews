
/* eslint-disable @next/next/no-img-element */

import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import Header from '../components/Header';
import ArticleSection from '../components/ArticleSection';
import DigestPanel from '../components/DigestPanel';


import Login from "./login";
export default function Home() {

  
      

  const { data, error } = useSWR('/api/posts');

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //console.log(data);
  return (
    <>
      
      <Header /> 
      <ArticleSection /> 
      <DigestPanel />

    </>
  );
}
