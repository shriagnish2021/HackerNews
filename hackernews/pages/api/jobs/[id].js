import { getJobById } from '../../../util/queryFunctions';

export default async function handler(req, res) {
  const { id } = req.query;
  const data = await getJobById(+id);

  res.status(200).json(data);
}
