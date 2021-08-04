import {
  addSubscriber,
  getSubscribers,
  getTopArticles,
} from "../../database/queries";
import mailClient from "nodemailer";

const client = mailClient.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "08f2b736e48e00",
    pass: "f3a0a504f2f09a"
  }
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
    req.headers.authorization === `Bearer ${process.env.EMAIL_PASSWORD}`
  ) {
    try {
      const articles = await getTopArticles();
      const html = createHTML(articles, "Post");
      const subscribers = await getSubscribers();
      subscribers.forEach((sb) => {
        sendEmail(sb.email, html);
      });
      res.status(200).json({ msg: "Done!" });
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
      from: process.env.EMAIL_USERNAME,
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
