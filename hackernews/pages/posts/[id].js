import useSWR from 'swr';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import ReadArticle from '../../components/ReadArticle.js';
import CommentSection from '../../components/CommentSection/CommentSection';
import {useSession} from 'next-auth';

import FullPageLoader from '../../components/FullPageLoader';

export default function Article() {
  const Router = useRouter();
  const path = Router.asPath;
  const {session, loading} = useSession();
  
  const articleId = path.split('posts/')[1]
  const {data: comments, error: err} = useSWR(`/api/comments?id=${articleId}`);

  const { data, error } = useSWR(`/api${path}`);

  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;
  console.log(data)
  return (
    <>
      <Header />
      <ReadArticle article={data} />
      <CommentSection articleId={articleId} data={comments} session={...session} />
    </>
  );
}
