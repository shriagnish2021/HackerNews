import { useState } from "react";
import logo from "../public/tenor.gif";
import Image from "next/image";

export default function EmailDigest() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubscribing(true);

    fetch("/api/email-digest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.email === email
          ? alert("Subscribed Successfully!!")
          : alert("Failed to subscribe. Please try again later.");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to subscribe. Please try again later.");
      })
      .finally(() => {
        setEmail("");
        setIsSubscribing(false);
      });
  }

  return (
    <div className="bg-blue-800 flex justify-center p-2 border-solid border-8 border-blue-900">
      <div className="max-w-lg min-w-min h-72 flex flex-col p-2 justify-between">
        <h3 className="text-3xl text-center text-white font-bold">
          Hacker News Digest!
        </h3>
        <p className="text-xl text-white">
          Subscribe to the Hacker News email digest and get the top post updates
          delivered straight to your inbox daily.
        </p>
        {isSubscribing ? (
          <div className="flex justify-center">
            <Image src={logo} height={45} width={45} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-row justify-around p-2 bg-white rounded-sm border-blue-900"
          >
            <input
              type="email"
              name="digest"
              id="digest"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              placeholder="Enter your email address."
              className="w-5/6 p-2 text-xl placeholder-gray-600"
              required
            />
            <input
              type="submit"
              value="&gt;"
              className="w-1/6 text-3xl bg-blue-400 text-white"
            />
          </form>
        )}
      </div>
    </div>
  );
}
