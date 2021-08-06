import { useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import ArticleCards from './ArticleCards';
import SearchBar from './SearchBar';
import ReactPaginate from 'react-paginate'

export default function ArticleSection({ data }) {
  const [articleData, setArticleData] = useState(data);
  const [pageNumber, setPageNumber] = useState(0);
  const articlesPerPage = 7;
  const pagesVisited = pageNumber * articlesPerPage;

  const displayArticles = articleData.slice(pagesVisited, pagesVisited + articlesPerPage).map(article => (
    <ArticleCards key={article.id} article={article} />
  ))

  const handleSearch = ({ tag, date }) => {
    if (tag && date) {
      console.log('will do later');
    } else if (date) {
      date = moment(date).format('LL');
      const sortByDate = data.filter((article) => moment(article.date).format('LL') === date);
      if (sortByDate.length !== 0) {
        setArticleData(sortByDate);
      } else {
        toast.error(`No Article is present in the date ${date} `, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    }
  };
  const pageCount = Math.ceil(articleData.length / articlesPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }
  return (
    <div className=" flex flex-col place-items-center items-center ">
      <SearchBar handleSearch={handleSearch} />
      {displayArticles}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"w-4/5 flex justify-center mb-4 text-gray-500 items-center"}
        disabledClassName={""}
        pageLinkClassName={"py-1 px-2 m-1 cursor-pointer font-bold text-xl focus:text-white hover:bg-blue-600 hover:text-white rounded"}
        nextLinkClassName={"py-1 px-2 m-1 cursor-pointer font-bold text-xl hover:text-yellow-600"}
        previousLinkClassName={"py-1 px-2 m-1 cursor-pointer font-bold text-xl hover:text-yellow-600"}
        activeLinkClassName={"bg-blue-600 rounded text-white"}
      />
    </div>
  );
}
