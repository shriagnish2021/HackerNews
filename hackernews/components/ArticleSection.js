import { useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import ArticleCards from './ArticleCards';
import SearchBar from './SearchBar';

export default function ArticleSection({ data, searchBarVisibility }) {
  const [articleData, setArticleData] = useState(data);
  const [pageNumber, setPageNumber] = useState(0);

  const articlesPerPage = 7;
  const pagesVisited = pageNumber * articlesPerPage;

  const displayArticles = articleData
    .slice(pagesVisited, pagesVisited + articlesPerPage)
    .map((article) => <ArticleCards key={article.id} article={article} />);

  const handleSearch = ({ searchTag, date }) => {
    if (searchTag && date) {
      const searchData = data.filter((article) => {
        const articleTag = article.Tag.map((tagObj) => tagObj.tag.toLowerCase());
        return articleTag.find((tag) => tag.includes(searchTag));
      });
      const sortByDate = searchData.filter(
        (article) => moment(article.date).format('LL') === moment(date).format('LL')
      );
      if (sortByDate.length !== 0) {
        setArticleData(sortByDate);
      } else {
        toast.error(`No Article is present in the date ${date} with tag "${searchTag}" `, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } else if (date) {
      const sortByDate = data.filter((article) => moment(article.date).format('LL') === moment(date).format('LL'));
      if (sortByDate.length !== 0) {
        setArticleData(sortByDate);
      } else {
        toast.error(`No Article is present in the date ${date} `, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } else if (searchTag) {
      const searchData = data.filter((article) => {
        const articleTag = article.Tag.map((tagObj) => tagObj.tag.toLowerCase());
        return articleTag.find((tag) => tag.includes(searchTag));
      });
      if (searchData.length !== 0) {
        setArticleData(searchData);
      } else {
        toast.error(`Article not found for the tag "${searchTag}" `, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    }
  };
  const searchWithinDateRange = ({ startDate, endDate }) => {
    startDate = moment(startDate).format('LL');
    endDate = moment(endDate).format('LL');

    const sortedData = data.filter(
      (article) => moment(article.date).format('LL') >= startDate && moment(article.date).format('LL') <= endDate
    );
    if (sortedData.length !== 0) {
      setArticleData(sortedData);
    } else {
      toast.error(`No Article is present within the date range ${startDate} - ${startDate} `, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  };
  const pageCount = Math.ceil(articleData.length / articlesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className=" flex flex-col place-items-center items-center  ">
      <SearchBar
        handleSearch={handleSearch}
        searchBarVisibility={searchBarVisibility}
        searchWithinDateRange={searchWithinDateRange}
      />

      {displayArticles}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="w-4/5 flex justify-center mb-4 text-gray-500 items-center"
        disabledClassName=""
        pageLinkClassName="py-1 px-2 m-1 cursor-pointer font-bold text-xl focus:text-white hover:bg-blue-600 hover:text-white rounded"
        nextLinkClassName="py-1 px-2 m-1 cursor-pointer font-bold text-xl hover:text-yellow-600"
        previousLinkClassName="py-1 px-2 m-1 cursor-pointer font-bold text-xl hover:text-yellow-600"
        activeLinkClassName="bg-blue-600 rounded text-white"
      />
    </div>
  );
}
