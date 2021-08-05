import {
  addSubscriber,
  getSubscribers,
  getTopArticles,
} from "../../database/queries";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY
);


export default async function subscribe(req, res) {
  if (req.method === "POST") {
    if (
      req.body.email
        ? req.body.email.includes("@") && req.body.email.includes(".")
        : false
    ) {
      try {
        const subscriber = await addSubscriber(req.body.email);
        return res.status(200).json({ email: subscriber.email });
      } catch (error) {
        return res.status(500).json({ email: "" });
      }
    } else {
      return res.status(404).json({ msg: "Bad Request" });
    }
  } else if (
    req.method === "GET" &&
    req.headers.authorization === `Bearer ${process.env.EMAIL_PASSWORD}`
  ) {
    try {
      res.status(200).json({ msg: "Done!" });
      const articles = await getTopArticles();
      const html = createHTML(articles, "Post");
      const subscribers = await getSubscribers();
      subscribers.forEach(async (sb) => {
        await sendEmail(sb.email, html)
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404).json({ msg: "Bad Request." });
  }
}

async function sendEmail(email, data) {
  const msg = {
    to: `${email}`,
    from: "hacker.news.project@gmail.com",
    subject: "Hacker News - Email Digest",
    html: `${data}`,
  };
  return sgMail.send(msg);
}

function createHTML(articleDataArray, type) {
  let emailContentHTML = `
  <h1>Hacker News - Email Digest!</h1>
  <p>Here are some of the best posts for today. Enjoy!</p>
  <h2>Top ${type}s</h2>
  <ol>`;
  articleDataArray.forEach((article) => {
    emailContentHTML += `
      <li><a href="https://hacker-news-delta.vercel.app/posts/${article.id}">${article.title}</a></li>
    `;
  });
  return emailContentHTML + `</ol>`;
}
