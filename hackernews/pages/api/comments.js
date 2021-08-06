import nextConnect from "next-connect";
import sanitizer from "../../util/sanitizer";

const apiRoute = nextConnect({
  onError(err, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get((req, res)=>{
    console.log(req.query);
    res.json({msg:"Success!!"})
});

export default apiRoute;