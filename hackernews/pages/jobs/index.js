import React from 'react'
import Header from '../../components/Header';
import JobPostCard from '../../components/Jobs/JobPostCard';
import useSWR from 'swr';
import FullPageLoader from '../../components/FullPageLoader';
import Footer from '../../components/Footer';

const Jobs = () => {
  const { data, error } = useSWR('/api/jobs');

  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;
    return (
        <>
          <Header />
          <div className="min-h-screen">
            {data.map(job => (
              <JobPostCard key={job.id} job={job} />
            ))}
          </div>
          <Footer />
        </>
    )
}

export default Jobs
