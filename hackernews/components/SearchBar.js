import { useState } from 'react';

export default function SearchBar({ handleSearch }) {
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch({ tag, date });
  };
  return (
    <form className="flex place-content-center mt-2 " onSubmit={(e) => handleFormSubmit(e)}>
      <input
        type="text"
        placeholder="Search Here"
        className="border-gray-400 border-2  p-1 rounded mr-4 w-2/5 "
        onChange={(e) => setTag(e.target.value)}
      />
      <div>
        <span> Sort by date:&nbsp; </span>
        <input
          type="date"
          id="date"
          name="date"
          className="border-gray-400 border-2  p-1 rounded mr-4 "
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit" className=" rounded-full bg-blue-800 text-white ">
        &emsp; Go &emsp;
      </button>
    </form>
  );
}
