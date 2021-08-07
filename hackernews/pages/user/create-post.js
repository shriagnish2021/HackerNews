import axios from 'axios';
import router from 'next/router';
import Header from '../../components/Header';
import ArticleInputForm from '../../components/ArticleInputForm';
import { useSession } from 'next-auth/client';
import  Unauthorized  from '../../components/unauthorized/Unauthorized';

export default function CreatePost() {
  const handleAddNewArticle = async ({ title, content, file, tags },setLoading) => {
    console.log(file)
    const url = await imageUpload(file)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('authorId', 1); //replace with user id from session
    formData.append('img', url);
    formData.append('tags', tags)
    
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const { data } = await axios.post('/api/posts', formData, config);
    setLoading(false);
    router.push(`/posts/${data.id}`);
  };
  const imageUpload = async (file) => {
    console.log(file)
    const data = new FormData();
    data.append('file', file)
    data.append('upload_preset', 'hacker-news')
    data.append('cloud_name','agnish')
    const res = await fetch('	https://api.cloudinary.com/v1_1/agnish/image/upload',{
      method:"POST",
      body:data,
    })
    const res2 = await res.json()
    return res2.url
  }
  return (
    
    <div className="bg-gray-100">
      <Header />
    {session?
      session && !loading?
      <ArticleInputForm addArticle={handleAddNewArticle} /> : <Unauthorized />}:''}
    </div>
  );
}
