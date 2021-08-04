import useSWR from 'swr';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import ReadArticle from '../../components/ReadArticle.js';

export default function Article() {
  const Router = useRouter();
  const path = Router.asPath;

  const { data, error } = useSWR(`/api${path}`);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header />
      <ReadArticle article={data} />
    </>
  );
}
