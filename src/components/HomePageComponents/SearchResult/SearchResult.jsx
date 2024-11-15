import "./SearchResult.css";
import { defaultNews } from "../../../utils/constants";
import NewsCard from "../../NewsCard/NewsCard";
import { useState } from "react";

function SearchResult({ isLoggedIn }) {
  const [visiableCard, setVisiableCard] = useState(3);

  const showAllCards = () => {
    setVisiableCard(defaultNews.length);
  };

  const show3Cards = () => {
    setVisiableCard(3);
  };
  return (
    <div className="search-result">
      <h1 className="search-result__title">Search results</h1>
      <ul className="search-result__cards-list">
        {defaultNews.slice(0, visiableCard).map((item) => {
          return (
            <NewsCard key={`${item.url}`} item={item} isLoggedIn={isLoggedIn} />
          );
        })}
      </ul>
      {visiableCard < defaultNews.length && (
        <button className="search-reasult__show-more" onClick={showAllCards}>
          Show more
        </button>
      )}
      {visiableCard > 3 && (
        <button className="search-reasult__show-more" onClick={show3Cards}>
          Show less
        </button>
      )}
    </div>
  );
}

export default SearchResult;
