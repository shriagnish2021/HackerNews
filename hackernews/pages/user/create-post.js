import axios from 'axios';
import router from 'next/router';

import Header from '../../components/Header';
import ArticleInputForm from '../../components/ArticleInputForm';

export default function createPost() {
  const handleAddNewArticle = async ({ title, content, file }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('authorId', 1);
    formData.append('img', file);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const { data } = await axios.post('/api/posts', formData, config);
    router.push(`/posts/${data.id}`);
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <ArticleInputForm addArticle={handleAddNewArticle} />
    </div>
  );
}