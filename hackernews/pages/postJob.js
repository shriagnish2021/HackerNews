import React, { useState,useRef,useEffect } from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import 'font-awesome/css/font-awesome.min.css';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/client';
import  Unauthorized  from '../components/unauthorized/Unauthorized';

function loadScript() {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false) 
        }
        document.body.appendChild(script)
    })
}
const PostJob = () => {
    const [loading, setLoading] = useState(false);
    const editorRef = useRef()
    const [ editorLoaded, setEditorLoaded ] = useState( false )
    const { CKEditor, ClassicEditor} = editorRef.current || {}
    const [session,load] = useSession()

    useEffect( () => {
        editorRef.current = {
          CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor, //Added .CKEditor
          ClassicEditor: require( '@ckeditor/ckeditor5-build-classic' ),
        }
        setEditorLoaded( true )
    }, [] );
    
    const router = useRouter()
    const [companyName,setCompanyName] = useState('');
    const [title,setTitle] = useState('')
    const [location,setLocation] = useState('');
    const [employmentType,setEmploymentType] = useState('');
    const [description,setDesription] = useState('')
    const [skills,setSkills] = useState([])
    const addSkill = (e) => {
        if(e.key === "Enter") {
            setSkills([...skills,e.target.value])
            e.preventDefault()
            e.target.value=""
        }
    }
    const removeSkill = (indexToRemove) => {
        setSkills(skills.filter((_,index) => index !== indexToRemove))
    }
    const handleJobSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        const jobData = {
            companyName,
            title,
            location,
            employmentType,
            description,
            skills
        }
        const res = await loadScript()

        if(!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }
        const url = process.env.NODE_ENV === 'development' ?  `http://localhost:3000/api/razorpay` : `https://hacker-news-delta.vercel.app/api/razorpay`;
        const response = await fetch(url,{method:'POST'})
        const data = await response.json()
        var options = {
            "key": "rzp_test_ECHU5EC4Un1Ri7", // Enter the Key ID generated from the Dashboard
            "amount": data.amount.toString(),
            "currency": data.currency,
            "order_id":data.id,
            "name": "Job Posting",
            "description": "Test Transaction",
            "image": "https://blogged-for-you.herokuapp.com/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg",
            "handler": async function (response){
                console.log(response,jobData)
                const formData = new FormData();
                formData.append('title',title)
                formData.append('companyName', companyName)
                formData.append('location', location)
                formData.append('employmentType',employmentType)
                formData.append('description', description)
                const url = process.env.NODE_ENV === 'development' ?  `http://localhost:3000/api/addJob` : `https://hacker-news-delta.vercel.app/api/addJob`;
                const res = await fetch(url,{
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(jobData),
                })
                const apiResponse = await res.json();
                console.log(apiResponse)
                setLoading(false)
                toast.warn("Job Posted successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                });
                router.push(`/jobs/${apiResponse.id}`)
            },
        };
        var rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', function (response){
                alert(response.error.reason);
                toast.warn("Payment failed!", {
                    position: toast.POSITION.TOP_CENTER,
                });
                setLoading(false)
                router.push(`/postJob`)
        });
        rzp1.open();
        
    }
    const handleCk = (e,editor) => {
        setDescription(editor.getData())
    }
    return (  
       
        <>

            <Header />
            { session && !load? 
            <>
            <div className="bg-job-post bg-cover text-white">
                <div className="w-1/2 py-36 pl-48 flex flex-col space-y-8">
                    <div className="text-5xl">Post your job for just &#8377;299</div>
                    <p className="text-xl">Reach the best candidates by posting a job within 60 seconds on one of India&apos;s largest assessed database.</p>
                </div>
            </div>
            <div className="flex justify-center bg-gray-100">
                <div className="bg-white mt-4 w-4/5">
                    <div className="text-2xl border-solid border-b-4 border-gray-100 px-4 py-2.5"><i className="fa fa-briefcase text-gray-600"></i>&nbsp;&nbsp;&nbsp;Job Details</div>
                    <form className="flex flex-col space-y-10 pr-8 pt-8 pb-4" onSubmit={handleJobSubmit}>
                        <div className="flex justify-end space-x-5 items-center">
                            <label htmlFor="company">Company Name</label>
                            <input className="p-2 border w-9/12 focus:outline-none border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-transparent rounded" type="text" name="company" id="company" placeholder="Enter the name of your company" onChange={(e) => setCompanyName(e.target.value)} required/>
                        </div>
                        <div className="flex justify-end space-x-5 items-center">
                            <label htmlFor="title">Job Title</label>
                            <input type="text" className="border w-9/12 p-2 focus:outline-none border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-transparent rounded" name="title" id="title" placeholder="Job Title" onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                        <div className="flex justify-end space-x-5 items-center">
                            <label htmlFor="location">Job Location</label>
                            <input className="border w-9/12 p-2 focus:outline-none border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-transparent rounded" type="text" name="location" id="location" placeholder="Enter the city" onChange={(e) => setLocation(e.target.value)} required/>
                        </div>
                        <div className="flex justify-end space-x-5 items-center">
                            <label htmlFor="employment-type">Employment Type</label>
                            <select
                                    className=" bg-white border border-gray-300 w-9/12 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent rounded"    
                                    name="employment-type"
                                    id="employment-type"
                                    onChange={(e) => setEmploymentType(e.target.value)}
                                >
                                    <option value="DEFAULT">
                                        Choose one...
                                    </option>
                                    <option value="full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Volunteer">Volunteer</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-5">
                            <label htmlFor="job-description">Job Description</label>
                            <div className="w-9/12 text-gray-700 rounded">
                                {editorLoaded ? <CKEditor
                                    editor={ ClassicEditor }
                                    description={description}
                                    data={'<p>Enter your job description here.</p>'}
                                    onChange={ (event, editor ) => {
                                        const data = editor.getData()
                                        setDesription(data);
                                    } }
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                        writer.setStyle(
                                            "height",
                                            "300px",
                                            editor.editing.view.document.getRoot()
                                        );
                                        });
                                    }}
                                /> : <p>Loading editor...</p>}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-5 items-center">
                            <label>Add Skills Required</label>
                            <div className="w-9/12 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent rounded">
                                <ul className="flex">
                                {skills.map((skill,index) => (
                                    <li key={index} className="text-gray-700 border-2 border-blue-600 font-bold py-1 px-2 rounded-xl my-2 mr-2">
                                        <span>{skill}&nbsp;&nbsp;</span>
                                        <i className="fa fa-times cursor-pointer" onClick={() => {removeSkill(index)}}></i>
                                    </li>
                                ))}
                                </ul>
                                <input className="border w-full p-2 focus:outline-none border-gray-300   focus:ring-1 focus:ring-blue-600 focus:border-transparent rounded" type="text" name="skills" id="skills" placeholder="Type a skill and press enter to add it." onKeyPress={addSkill}/>
                            </div>
                        </div>
                        <div className="flex justify-end"><button type="submit" className="w-1/5 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                            {loading && <i className="fa fa-refresh fa-spin" />}
                            {loading && <span>&nbsp;&nbsp;</span>}
                            Pay and Post Job</button></div>
                    </form>
                </div>
            </div>
            </>:
        <Unauthorized />
        }
        </>
    )
}

export default PostJob
