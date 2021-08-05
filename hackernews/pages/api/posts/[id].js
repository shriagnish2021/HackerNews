import { getArticleById } from '../../../util/queryFunctions';

export default async function handler(req, res) {
  const { id } = req.query;
  const data = await getArticleById(+id);

  res.status(200).json(data);
}
