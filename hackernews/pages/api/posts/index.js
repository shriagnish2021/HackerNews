import nextConnect from 'next-connect';
import multer from 'multer';
import { getAllArticles, createData } from '../../../util/queryFunctions';
import sanitizer from '../../../util/sanitizer.js';
import logger from '../../../util/winstonLogger.js';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
const uploadMiddleware = upload.array('img');
apiRoute.use(uploadMiddleware);

// Process a GET request
apiRoute.get(async (req, res) => {
  const data = await getAllArticles();
  res.status(200).json(data);
});

// Process a PUT request
apiRoute.post(async (req, res) => {
  try {
    const title = sanitizer(req.body.title);
    const content = sanitizer(req.body.content);
    const newArticle = {
      authorId: +req.body.authorId,
      title,
      content,
    };
    const newArticleData = await createData(newArticle);
    res.status(200).json(newArticleData);
  } catch (err) {
    logger.error(err.stack);
    res.status(501).json({ msg: ' There is an error. Our tech team has been notified.' });
  } finally {
    console.log('hello');
  }
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
