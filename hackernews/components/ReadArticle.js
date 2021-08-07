/* eslint-disable @next/next/link-passhref */
import { FaCalendarAlt, FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import moment from 'moment';
import marked from 'marked';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { mutate } from 'swr';
import { toast } from 'react-toastify';
import router from 'next/router';
import Link from 'next/link';

export default function ReadArticle({ article }) {
  console.log(article);
  const [session, loading] = useSession();
  const imagePath = `/images/malware.jpg`;
  const deleteArticle = async () => {
    const res = await fetch(`/api/posts?id=${article.id}`, {
      method: 'DELETE',
    });
    console.log(res.status);
    if (res.status === 200) {
      mutate('/api/posts');
      router.push(`/`);
      toast.error(`Article ${article.title} deleted successfully `, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  };
  return (
    <div className="flex flex-col place-items-center items-center mt-12 ml-1 ">
      <div className="w-3/5 mb-2 ">
        <h2 className="font-bold text-2xl text-justify ">{article.title}</h2>
        <span className="text-gray-600 text-xs relative">
          <FaCalendarAlt className="absolute top-0" /> &emsp; {moment(article.date).format('LL')}
        </span>{' '}
        &emsp; &ensp;
        <span className="text-gray-600 text-xs relative ">
          <FaUser className="absolute top-0 -left-4 " />
          {article.User.userName}
        </span>
        {session && !loading ? (
          session.user.role == 'ADMIN' || session.user.id == article.authorId ? (
            <p className="flex mt-2">
              <Link href={`/user/edit/${article.id}`}>
                <span className="mr-4">
                  {' '}
                  <FaEdit />{' '}
                </span>
              </Link>
              <span>
                <button type="button" onClick={deleteArticle}>
                  <FaTrash />
                </button>
              </span>
            </p>
          ) : null
        ) : null}
      </div>
      <Image src={imagePath} width={775} height={300} layout="intrinsic" alt="Cover Image" />
      <p
        className="w-3/5 mt-6 text-gray-800 text-sm text-justify"
        dangerouslySetInnerHTML={{ __html: marked(article.content) }}
      />
    </div>
  );
}
