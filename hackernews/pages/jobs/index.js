import React from 'react'
import Header from '../../components/PostJob/Header';
import JobPostCard from '../../components/Jobs/JobPostCard';
import useSWR from 'swr';

const Jobs = () => {
  const { data, error } = useSWR('/api/jobs');

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
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
