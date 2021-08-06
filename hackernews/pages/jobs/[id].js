import useSWR from 'swr';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import JobPostCard from '../../components/Jobs/JobPostCard';
import FullPageLoader from '../../components/FullPageLoader';

export default function Article() {
  const Router = useRouter();
  const path = Router.asPath;
  const { data, error } = useSWR(`/api${path}`);

  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;

  return (
    <>
      <Header />
      <JobPostCard job={data} description={true}/>
      {/* <div className="w-full flex justify-center my-4">
        <div className="w-6/12 text-2xl">Job Description</div>
      </div> */}
      <div className="w-full flex justify-center my-4"> 
        <div className="w-6/12 ck-content" dangerouslySetInnerHTML={{ __html: data.description }}>
        </div>
      </div>
    </>
  );
}
