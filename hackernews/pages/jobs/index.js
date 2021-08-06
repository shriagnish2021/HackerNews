import React from 'react'
import Header from '../../components/PostJob/Header';
import JobPostCard from '../../components/Jobs/JobPostCard';
import useSWR from 'swr';
import FullPageLoader from '../../components/FullPageLoader';

const Jobs = () => {
  const { data, error } = useSWR('/api/jobs');

  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;
    return (
        <>
          <Header />
          {data.map(job => (
            <JobPostCard key={job.id} job={job} />
          ))}
        </>
    )
}

export default Jobs
