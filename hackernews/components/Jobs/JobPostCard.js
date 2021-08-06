import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import Link from 'next/link';

const JobPostCard = ({ job,description }) => {
    const skills = job.JobSkill
    return (
        <div className="w-full flex justify-center my-4">
            <div className="w-6/12 border p-4 flex justify-between rounded-lg">
                <div>
                    <h2 className="text-2xl">{job.title}</h2>
                    <p className="text-gray-600">{job.companyName}</p>
                    <span><i className="fa fa-map-marker text-gray-500"></i>&nbsp;&nbsp;{job.location}</span>
                    <div>
                        <span className="inline-block align-middle">Skills:&nbsp;&nbsp;</span>
                        <ul className="inline-block align-baseline">
                            {skills.map((skill,index) => (
                                <li key={index} className="inline-block align-middle text-gray-700 border border-blue-600 py-py px-2 rounded-xl my-2 mr-2">
                                    <span className="inline-block text-sm">{skill.skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <span className="   text-sm">Posted on : {new Date(job.createdAt).toDateString()}</span>
                    {description? '' : (
                        <Link href={`/jobs/${job.id}`}><div className="cursor-pointer border border-blue-600 bg-gray-50 hover:bg-gray-200 rounded-lg text-center py-2 px-2">View Description</div></Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JobPostCard
