import nextConnect from "next-connect";
import { getAllJobs } from "../../../util/queryFunctions";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Process a GET request
apiRoute.get(async (req, res) => {
  const data = await getAllJobs();
  res.status(200).json(data);
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
