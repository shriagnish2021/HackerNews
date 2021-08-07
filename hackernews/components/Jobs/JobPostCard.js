import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import Link from 'next/link';

const JobPostCard = ({ job,description }) => {
    const skills = job.JobSkill
    return (
        <div className="w-full flex justify-center my-8">
            <div className="w-5/6 lg:w-6/12 border p-4 rounded-lg shadow-xl">
                <div className="flex flex-col sm:flex-row lg:flex-row justify-between">
                    <div>
                        <h2 className="text-2xl">{job.title}</h2>
                        <p className="text-blue-600">{job.companyName}</p>
                        <span><i className="fa fa-map-marker text-yellow-600"></i>&nbsp;&nbsp;{job.location}</span>
                        <div>
                            <span className="inline-block align-middle">Skills:&nbsp;&nbsp;</span>
                            <ul className="inline-block align-baseline">
                                {skills.map((skill,index) => (
                                    <li key={index} className="inline-block align-middle text-gray-700 border-2 border-blue-600 py-py px-2 rounded-xl my-2 mr-2">
                                        <span className="inline-block text-sm">{skill.skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <span className="text-gray-600 pb-3 sm:pb-0">Posted on : {new Date(job.createdAt).toDateString()}</span>
                        {description? '' : (
                            <Link href={`/jobs/${job.id}`} passHref>
                                <div className="cursor-pointer border-2 self-start border-blue-600 bg-gray-50 hover:bg-blue-600 hover:text-white rounded text-center p-2">View Description</div>
                            </Link>
                        )}
                    </div>
                </div>
                {description? (
                <div className="w-full my-4"> 
                    <div className="w-6/12 ck-content" dangerouslySetInnerHTML={{ __html: job.description }}></div>
                </div>
                ) : ''}
            </div>
        </div>
    )
}

export default JobPostCard
