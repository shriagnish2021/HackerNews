import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import Link from 'next/link';

const JobPostCard = () => {
    const skills = ['c++','java']
    return (
        <div className="w-full flex justify-center">
            <div className="w-3/5 border p-1 flex justify-between">
                <div>
                    <h2 className="text-xl">Software Engineer</h2>
                    <p>Mountblue Technologies</p>
                    <span><i className="fa fa-map-marker"></i>&nbsp;&nbsp;Bangalore, Karnataka.</span>
                    <div>
                        <span>Skills:&nbsp;&nbsp;</span>
                        <ul className="inline-block">
                            {skills.map((skill,index) => (
                                <li key={index} className="inline-block text-gray-700 border-2 border-blue-600 font-bold py-py px-2 rounded-xl my-2 mr-2">
                                    <span className="text-center">{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <span>Posted on : 2/2/2021</span>
                    {/* <Link href={`/Jobs/${job.id}`}>View Description</Link> */}
                    <Link href='/'><div>View Description</div></Link>
                </div>
            </div>
        </div>
    )
}

export default JobPostCard
