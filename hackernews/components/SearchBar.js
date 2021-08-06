import { useState } from 'react';

export default function SearchBar({ handleSearch, searchWithinDateRange, searchBarVisibility }) {
  const [searchTag, setTag] = useState('');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    handleSearch({ searchTag, date });
  };
  const handleDateFormSubmit = (e) => {
    e.preventDefault();
    searchWithinDateRange({ startDate, endDate });
  };
  if (searchBarVisibility.search) {
    return (
      <form className="flex place-content-center mt-2 " onSubmit={(e) => handleSearchFormSubmit(e)}>
        <input
          type="text"
          placeholder="Search by tags..."
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
  if (searchBarVisibility.searchWithinDateRange) {
    return (
      <form className="flex place-content-center my-2 text-sm  " onSubmit={(e) => handleDateFormSubmit(e)}>
        <span className="p-1.5 mr-2"> Search within the date range : </span>
        <div>
          <span> Start:&nbsp; </span>
          <input
            type="date"
            id="startDate"
            name="startDate"
            required
            className="border-gray-400 border-2  p-1 rounded mr-4 "
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <span> End:&nbsp; </span>
          <input
            type="date"
            id="endDate"
            name="endDate"
            required
            className="border-gray-400 border-2  p-1 rounded mr-4 "
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit" className=" rounded-full bg-blue-800 text-white ">
          &emsp; Go &emsp;
        </button>
      </form>
    );
  }

  return '';
}
