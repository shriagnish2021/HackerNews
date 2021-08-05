import useSWR from 'swr';
import Header from '../components/Header';
import ArticleSection from '../components/ArticleSection';
import DigestPanel from '../components/DigestPanel';

export default function Home() {
  const { data, error } = useSWR('/api/posts');
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <Header />
      <ArticleSection data={data} />
      <DigestPanel />
    </>
  );
}
