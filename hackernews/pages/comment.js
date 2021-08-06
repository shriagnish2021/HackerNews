import CommentSection from "../components/CommentSection/CommentSection";

import moment from 'moment';

const data = [
  {
    id:1,
    content:'Comment 1',
    parentCommentId: 0,
    date:new Date(),
    articleId:1,
    article:{},
    authorId:1,
    author:{userName:"Author 1"},
  },
  {
    id:2,
    content:'Comment 1',
    parentCommentId: 0,
    date:moment(),
    articleId:1,
    article:{},
    authorId:1,
    author:{userName:"Author 1"},
  },
  {
    id:3,
    content:'Comment Reply to 2',
    parentCommentId: 2,
    date:moment(),
    articleId:1,
    article:{},
    authorId:1,
    author:{userName:"Author 1"},
  },
  {
    id:4,
    content:'Comment Reply to 1',
    parentCommentId: 2,
    date:moment(),
    articleId:1,
    article:{},
    authorId:1,
    author:{userName:"Author 1"},
  },
]

export default function Comments() {
  return (
    <div className="w-full h-full flex justify-center items-center ">
    <CommentSection articleId={1} data={data} session={{user:{userName:"My name", id:12}}} />
    </div>
  );
}
