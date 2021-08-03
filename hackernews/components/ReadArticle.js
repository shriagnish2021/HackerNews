import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import moment from 'moment';
import marked from 'marked';
import Image from 'next/image';
import Link from 'next/link';

export default function ReadArticle({ article }) {
  const imagePath = `/images/malware.jpg`;
  return (
    <div className="flex flex-col place-items-center items-center mt-12 ml-1 ">
      <div className="w-3/5 mb-2 ">
        <h2 className="font-bold text-2xl text-justify ">{article.title}</h2>
        <span className="text-gray-600 text-xs relative">
          <FaCalendarAlt className="absolute top-0" /> &emsp; {moment(article.date).format('LL')}
        </span>{' '}
        &emsp; &ensp;
        <span className="text-gray-600 text-xs relative">
          <FaUser className="absolute top-0 -left-4 " />
          {article.userTable.name}
        </span>
      </div>
      <Image src={imagePath} width={775} height={300} layout="intrinsic" alt="Cover Image" />
      <p
        className="w-3/5 mt-6 text-gray-800 text-sm text-justify"
        dangerouslySetInnerHTML={{ __html: marked(article.markdown) }}
      />
    </div>
  );
}
