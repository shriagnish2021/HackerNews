/* eslint-disable jsx-a11y/alt-text */
import accountImg from "../../public/images/account_circle_black_24dp.svg";
import Image from "next/image";
import Reply from "./Replies";
import moment from "moment";
import { useState } from "react";
import AddComment from "./AddComment";
import { v4 as uuid4 } from "uuid";
import sanitizer from "../../util/sanitizer";

export default function Comment({ comment, replies, session, articleId, addComment}) {
  const commentReplies = replies.filter(
    (reply) => reply.parentCommentId === comment.id
  );
  const [showReplyField, setShowReplyField] = useState(false);
  
  return (
    <article className="border-2 border-black inline-block mb-3 relative min-w-full">
      <figure className="inline-block min-w-max">
        <Image
          src={comment.author.image ? comment.author.image : accountImg}
          width={50}
          height={50}
        />
      </figure>
      <div className="inline-block absolute right-1">
        {moment(comment.date).calendar()}
      </div>
      <div className="flex flex-col">
        <h2 className="inline-block mb-3 ml-1">{comment.author.userName}</h2>
        <p className="p-2 text-gray-700">{comment.content}</p>
        {session && session.user ? (
          <div className="flex justify-end">
            <button
              className="mr-3"
              onClick={() => {
                setShowReplyField(!showReplyField);
              }}
            >
              &#x21aa; Reply
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`flex flex-col items-end p-2 ${
          commentReplies.length || showReplyField ? "bg-gray-100" : ""
        }`}
      >
        {console.log(comment.id)}
        {showReplyField ? <AddComment onSubmit={(e,input)=>addComment(e,input,comment.id)} label="reply" /> : ""}
        {commentReplies.map((reply) => (
          <Reply key={reply.id} content={reply} />
        ))}
      </div>
    </article>
  );
}
