import nextConnect from "next-connect";
import sanitizer from "../../util/sanitizer";
import { addComment, getCommentsByArticleId } from "../../database/queries";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  if (req.query.id) {
    try {
      const comments = await getCommentsByArticleId(parseInt(req.query.id));
      console.log(comments);
      return res.status(200).json(comments);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: `Sorry something Happened! ${error.message}` });
    }
  } else {
    return res.json({ msg: "Please pass a valid article id." });
  }
});

apiRoute.post(async (req, res) => {

  if (req.body) {
    try {
      
      const { id, content, parentCommentId, date, articleId, authorId } =
        req.body;
      const response = await addComment({
        id,
        content: sanitizer(content),
        articleId:parseInt(articleId),
        authorId:parseInt(authorId),
        parentCommentId,
        date,
      });
      response.id
        ? res.status(201).json({ msg: "Successful!" })
        : res.status(500).json({ error: `Sorry, something went wrong!!` });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: `Sorry something Happened! ${error.message}` });
    }
  } else {
      res.status(404).json({msg:"No data recieved."})
  }
});

export default apiRoute;