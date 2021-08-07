import axios from 'axios';
import router from 'next/router';
import Header from '../../components/Header';
import ArticleInputForm from '../../components/ArticleInputForm';
import { useSession } from 'next-auth/client';
import  Unauthorized  from '../../components/unauthorized/Unauthorized';

export default function CreatePost() {
  const [session,loading] = useSession()
  const handleAddNewArticle = async ({ title, content, file, tags },setLoading) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('authorId', session.user.id); //replace with user id from session
    formData.append('img', file);

    formData.append('tags', tags)
    
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const { data } = await axios.post('/api/posts', formData, config);
    setLoading(false)
    router.push(`/posts/${data.id}`);
  };

  return (
    
    <div className="bg-gray-100">
      <Header />
      {session && !loading?
      <ArticleInputForm addArticle={handleAddNewArticle} /> : <Unauthorized />}
    </div>
  );
}
