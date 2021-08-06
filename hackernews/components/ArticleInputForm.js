import { useState } from 'react';
import Link from 'next/link';
import 'font-awesome/css/font-awesome.min.css';

export default function ArticleInputForm({ addArticle }) {

  const [loading, setLoading] = useState(false);
  const [tags,setTags] = useState([])
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState({});


  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    addArticle({
      title,
      content,
      file: imageFile,
      tags,
    },setLoading);
  };
  const addTag = (e) => {
    if (e.key === 'Enter') {
      setTags([...tags, e.target.value]);
      e.preventDefault();
      e.target.value = '';
    }
  };
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  return (
    <>
      <div className="flex flex-col place-items-center items-center mt-8  ">
        <h1 className="text-3xl"> Create Post </h1>
        <form encType="multipart/form-data" className=" bg-white w-3/5 py-6 px-8" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col   w-100 ">
            <div className="border border-black w-40 rounded p-2 ">
              <label htmlFor="img">
                Add a cover image
                <input type="file" accept="image/*" id="img" name="img" hidden onChange={handleFile} />
              </label>
            </div>
            <div className="flex mt-2">{imageFile ? imageFile.name : null}</div>
            <div>
              <input
                required
                type="text"
                name="title"
                id="title"
                className="mt-6 mb-3 text-4xl w-full focus:outline-none"
                defaultValue={title}
                placeholder="Title here..."
                onChange={(e) => setTitle(e.target.value)}
              />{' '}
            </div>
            <div className="w-full ml-0 mb-5">
              <ul className="flex">
                {tags.map((tag, index) => (
                  <li key={index} className="text-gray-700 border-2 border-blue-600 py-1 px-2 rounded-xl my-2 mr-2">
                    <span>{tag}&nbsp;&nbsp;</span>
                    <i
                      className="fa fa-times cursor-pointer"
                      onClick={() => {
                        removeTag(index);
                      }}
                    />
                  </li>
                ))}
              </ul>
              <input
                className="w-full pb-1 mt-3 focus:outline-none text-lg"
                type="text"
                name="tags"
                id="tags"
                placeholder="Type a tag and press enter to add it..."
                onKeyPress={addTag}
              />
            </div>
            <div>
              <textarea
                rows={15}
                required
                name="content"
                id="content"
                className="w-full  text-xl focus:outline-none"
                defaultValue={content}
                placeholder="Write you content here in markdown..."
                onChange={(e) => setContent(e.target.value)}
              />{' '}
            </div>
          </div>
          <div>
            <button type="submit" className="m-2 p-1 px-2 border text-xl border-black rounded bg-gray-600 text-white">

              {loading && <i className="fa fa-refresh fa-spin" />}
              {loading && <span>&nbsp;&nbsp;</span>}
              {' '}
              Publish{' '}
            </button>
            <Link href="/">
              <span className="p-2 px-2 border border-black rounded text-xl  ">Cancel</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
