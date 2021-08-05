import useSWR from 'swr';
import ArticleCards from './ArticleCards';

export default function ArticleSection() {
  const { data, error } = useSWR('/api/posts');

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div className=" flex flex-col place-items-center items-center  ">
      {data.map((article) => (
        <ArticleCards key={article.id} article={article} />
      ))}
    </div>
  );
}
