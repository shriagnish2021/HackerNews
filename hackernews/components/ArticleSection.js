import { useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import ArticleCards from './ArticleCards';
import SearchBar from './SearchBar';

export default function ArticleSection({ data }) {
  const [articleData, setArticleData] = useState(data);
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
  return (
    <div className=" flex flex-col place-items-center items-center  ">
      <SearchBar handleSearch={handleSearch} />
      {articleData.map((article) => (
        <ArticleCards key={article.id} article={article} />
      ))}
    </div>
  );
}
