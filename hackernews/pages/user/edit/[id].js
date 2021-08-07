import useSWR from 'swr';
import { useRouter, router } from 'next/router';
import axios from 'axios';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ArticleUpdateForm from '../../../components/ArticleUpdateForm';

import FullPageLoader from '../../../components/FullPageLoader';

export default function Article() {
  const Router = useRouter();
  const { id } = Router.query;
  const { data, error } = useSWR(`/api/posts/${id}`);

  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;
  const tagsArr = data.Tag.map((articleTags) => articleTags.tag);

  const handleUpdateArticle = async (updatedData) => {
    const formData = new FormData();
    formData.append('title', updatedData.title);
    formData.append('content', updatedData.content);
    formData.append('id', updatedData.id);
    formData.append('img', updatedData.file);
    formData.append('tags', updatedData.tags);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const response = await axios.put('/api/posts', formData, config);
    Router.push(`/posts/${data.id}`);
  };

  return (
    <>
      <Header />
      <ArticleUpdateForm data={data} tagsArr={tagsArr} updateArticle={handleUpdateArticle} />
      <Footer />
    </>
  );
}
