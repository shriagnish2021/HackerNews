import { useState } from 'react';
import Link from 'next/link';

export default function ArticleInputForm({ addArticle }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState({});

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle({
      title,
      content,
      img: imageFile,
    });
  };

  return (
    <>
      <div className="flex flex-col place-items-center items-center mt-8  ">
        <h1 className="text-3xl "> Create Post </h1>
        <form encType="multipart/form-data" className=" bg-white w-3/5 py-6 px-8" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col   w-100 ">
            <div className="border border-black w-40 rounded p-2 ">
              <label htmlFor="img">
                Add a cover image
                <input type="file" accept="image/*" id="img" name="img" hidden onChange={handleFile} />
              </label>
            </div>
            <div>
              <input
                required
                type="text"
                name="title"
                id="title"
                className="my-6 text-3xl w-full focus:outline-none"
                defaultValue={title}
                placeholder="Title here..."
                onChange={(e) => setTitle(e.target.value)}
              />{' '}
            </div>
            <div>
              <textarea
                rows={15}
                required
                name="content"
                id="content"
                className="w-full mt-2 text-xl focus:outline-none"
                defaultValue={content}
                placeholder="Write you content here in markdown..."
                onChange={(e) => setContent(e.target.value)}
              />{' '}
            </div>
          </div>
          <div>
            <button type="submit" className="m-2 p-1 px-2 border text-xl border-black rounded bg-gray-600 text-white">
              {' '}
              Publish{' '}
            </button>
            <Link className="p-2 px-2 border border-black rounded text-xl " href="/">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
