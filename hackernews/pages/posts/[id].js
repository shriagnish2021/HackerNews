import useSWR from 'swr';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import ReadArticle from '../../components/ReadArticle.js';
import CommentSection from '../../components/CommentSection/CommentSection';
import { useSession } from 'next-auth/client';

import FullPageLoader from "../../components/FullPageLoader";
import { useState } from 'react';

export default function Article() {
  typeof window !== 'undefined'
  const Router = useRouter();
  const {id} = Router.query;



  console.log(id);
  

  const { data, error} = useSWR(id?`/api/posts/${id}`:null);
  
  const [session,load] = useSession();
  
 
  
  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;
  
  return (
    <>
      <Header />
      <ReadArticle article={data} />
      <div className="w-full flex justify-center mt-6">
        <CommentSection session={session} articleId={id} />
      </div>
    </>
  );
}



