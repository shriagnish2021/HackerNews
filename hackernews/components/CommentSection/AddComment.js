import { useRef, useState } from "react";

export default function AddComment({ onSubmit, label }) {
  const [input, setInput] = useState("");
  return (
    <form
      onSubmit={(e) => {
        setInput("");
        onSubmit(e, input);
      }}
      className="min-w-full p-2 mb-2 border-2 border-black bg-white"
    >
      <label htmlFor="comment" className="text-xl">{`Add ${label}:`}</label>
      <textarea
        name="comment"
        className="min-w-full h-20 p-1 text-lg"
        placeholder={"Enter here."}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      ></textarea>
      <input
        type="submit"
        value="Reply"
        className="block rounded-md bg-white border-2 p-2 text-lg border-blue-900 hover:bg-blue-700 hover:text-white"
      />
    </form>
  );
}
