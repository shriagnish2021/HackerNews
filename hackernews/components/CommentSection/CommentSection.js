import Comment from "./Comment";
import { v4 as uuid4 } from "uuid";
import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import sanitizer from "../../util/sanitizer";

export default function CommentSection({ data, session, articleId }) {
  const commentsArray = data.filter((comment) => !comment.parentCommentId);
  const [comments, setComments] = useState([...commentsArray]);
  const repliesArray = data.filter((comment) => !!comment.parentCommentId);
  const [replies, setReplies] = useState([...repliesArray]);

  useEffect(() => {}, [data]);

  async function addComment(e, input) {
    e.preventDefault();
    if (input) {
      const newComment = {
        id: uuid4(),
        content: sanitizer(input),
        parentCommentId: 0,
        date: new Date(),
        articleId,
        article: {},
        authorId: session.user.id,
        author: { userName: session.user.userName, image:session.user.image },
      };
      setComments((currentState) => [...currentState, newComment]);

      const response = await fetch('/api/comments', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(newComment)
      }).then(res => res.json()).catch(e => {console.log(e)});
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
            setReplies={setReplies}
            session={session}
            articleId={articleId}
          />
        );
      })}
    </section>
  );
}
