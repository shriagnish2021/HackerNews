import accountImg from "../../public/images/account_circle_black_24dp.svg";
import Image from "next/image";
import moment from 'moment';

export default function Reply({content}) {
  return (
    <article className="w-4/5 border-2 border-black inline-block mb-3 relative bg-white">
      <figure className="inline-block min-w-max">
        <Image src={content.author.image? content.author.image: accountImg} width={50} height={50} />
      </figure>
      <div className="inline-block absolute right-1">{moment(content.date).calendar()}</div>
      <div className="flex flex-col">
        <h2 className="inline-block mb-3 ml-1">{content.author.userName}</h2>
        <p className="p-2 text-gray-700">
          {content.content}
        </p>
      </div>
    </article>
  );
}
