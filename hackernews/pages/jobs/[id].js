import useSWR from 'swr';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import JobPostCard from '../../components/Jobs/JobPostCard';
import FullPageLoader from '../../components/FullPageLoader';
import Footer from '../../components/Footer';

export default function Article() {
  const Router = useRouter();
  const path = Router.asPath;
  const { data, error } = useSWR(`/api${path}`);

  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;

  return (
    <>
      <Header />
      <div className="h-screen">
        <JobPostCard job={data} description={true}/>
      </div>
      <Footer />
    </>
  );
}
