import {
  addSubscriber,
  getSubscribers,
  getTopArticles,
} from "../../database/queries";
import mailClient from "nodemailer";

const client = mailClient.createTransport({
  service: "gmail",
  auth: {
    user: NEXT_PUBLIC_EMAIL_USERNAME,
    pass: NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

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
    req.headers.authorization === `Bearer ${NEXT_PUBLIC_EMAIL_PASSWORD}`
  ) {
    try {
      res.status(200).json({ msg: process.env.EMAIL_USERNAME });
      const articles = await getTopArticles();
      const html = createHTML(articles, "Post");
      const subscribers = await getSubscribers();
      subscribers.forEach((sb) => {
        sendEmail(sb.email, html);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404).json({ msg: "Bad Request." });
  }
}

function sendEmail(email, data) {
  client.sendMail(
    {
      from: NEXT_PUBLIC_EMAIL_USERNAME,
      to: email,
      subject: "Email Digest - Hacker News!",
      html: data,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent: " + info.response);
      }
    }
  );
}

function createHTML(articleDataArray, type) {
  let emailContentHTML = `
  <h1>Hacker News - Email Digest!</h1>
  <p>Here are some of the best posts for today. Enjoy!</p>
  <h2>Top ${type}s</h2>
  <ol>`;
  articleDataArray.forEach((article) => {
    emailContentHTML += (`
      <li><a href="https://hacker-news-delta.vercel.app/posts/${article.id}">${article.title}</a></li>
    `)
  });
  return emailContentHTML + `</ol>`
}
