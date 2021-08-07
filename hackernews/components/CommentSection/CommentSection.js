import Comment from "./Comment";
import { v4 as uuid4 } from "uuid";
import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import sanitizer from "../../util/sanitizer";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import FullPageLoader from "../FullPageLoader";

export default function CommentSection({ session, articleId }) {
  const router = useRouter();
  // const articleId = router.query.id;
  const { data, error, isValidating } = useSWR(
    `/api/comments?id=${articleId}`,
    { refreshInterval: 5000}
  );

  // const [comments, setComments] = useState([]);

  // const [replies, setReplies] = useState([]);
  if(!data){
    return <FullPageLoader />
  }
 
    const comments = data.filter((comment) => !comment.parentCommentId);
    const replies = data.filter((comment) => !!comment.parentCommentId);
    // setComments(commentsArray);
    // setReplies(repliesArray);
  

  async function addComment(e, input, parentCommentId=0) {
    e.preventDefault();
    if (input) {
      const newComment = {
        id: uuid4(),
        content: sanitizer(input),
        parentCommentId,
        date: new Date(),
        articleId,
        article: {},
        authorId: session.user.id,
        author: { userName: session.user.userName, image: session.user.image },
      };
      // setComments((currentState) => [...currentState, newComment]);

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      })
        .then((res) => {res.json();mutate(`/api/comments?id=${articleId}`)})
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <section className="w-3/5 p-4 border-4 box-border">
      <h1 className="box-border border-b-2 border-black text-3xl mb-6">
        Comments
      </h1>
      {session && session.user ? (
        <AddComment onSubmit={addComment} label={"comment"} />
      ) : (
        ""
      )}
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            replies={replies}
            addComment={addComment}
            session={session}
            articleId={articleId}
          />
        );
      })}
    </section>
  );
}
