import useSWR from 'swr';
import { useState } from 'react';
import Header from '../components/Header';
import ArticleSection from '../components/ArticleSection';
import DigestPanel from '../components/DigestPanel';

import Footer from '../components/Footer';
import FullPageLoader from '../components/FullPageLoader';

export default function Home() {
  const [searchBarVisibility, setSearchBarVisibility] = useState({
    search: false,
    searchWithinDateRange: false,
  });
  const { data, error } = useSWR('/api/posts');
  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;

  return (
    <>
      <Header setSearchBarVisibility={setSearchBarVisibility} />
      <ArticleSection data={data} searchBarVisibility={searchBarVisibility} />
      <DigestPanel />
      <Footer />
    </>
  );
}
