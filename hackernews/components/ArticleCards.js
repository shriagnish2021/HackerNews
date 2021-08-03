import Image from 'next/image';
import moment from 'moment';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import Link from 'next/link';

export default function ArticleCards({ article }) {
  const imagePath = `/images/malware.jpg`;

  return (
    <div className="flex m-6 w-2/4  ">
      <Image src={imagePath} width={250} height={150} layout="intrinsic" alt="Cover Image" />
      <div className="w-3/5 ml-4  ">
        <h2 className="font-bold">
          {' '}
          <Link href={`/posts/${article.id}`}>{article.title}</Link>{' '}
        </h2>
        <span className="text-gray-600 text-sm relative">
          <FaCalendarAlt className="absolute top-0" /> &emsp; {moment(article.date).format('LL')}
        </span>{' '}
        &emsp; &ensp;
        <span className="text-gray-600 text-sm relative">
          <FaUser className="absolute top-0 -left-4 " />
          {article.userTable.name}
        </span>
      </div>
    </div>
  );
}
