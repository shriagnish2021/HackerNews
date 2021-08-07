import { getArticleById } from "../../../util/queryFunctions";

export default async function handler(req, res) {
  const { id } = req.query;
  console.log(req.query, "id:", id);
  let data = {};
  if (typeof id !== "undefined") {
    data = await getArticleById(parseInt(id));
  }

  res.status(200).json(data);
}
