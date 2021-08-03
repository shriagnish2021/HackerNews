import { addSubscriber, getSubscribers } from "../../database/queries";
import mailClient from "nodemailer";

const client = mailClient.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
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
    req.headers.authorization === `Bearer ${process.env.EMAIL_PASSWORD}`
  ) {
    try {
      res.status(200).json({msg:"Done!"});
      const subscribers = await getSubscribers();
      subscribers.forEach((sb) => {
        sendEmail(sb.email, "Sorry! This is a test.");
      });
    } catch (error) {
      console.log(error);
    }
  } else{
    res.status(404).json({msg:"Bad Request."})
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
