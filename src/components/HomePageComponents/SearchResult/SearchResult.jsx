import "./SearchResult.css";
import { defaultNews } from "../../../utils/constants";
import NewsCard from "../../NewsCard/NewsCard";
import { useState } from "react";
import notFound from "../../../assets/notFound.png";

function SearchResult({ isLoggedIn, isLoading }) {
  const [visiableCard, setVisiableCard] = useState(3);

  const showAllCards = () => {
    setVisiableCard(defaultNews.length);
  };

  const show3Cards = () => {
    setVisiableCard(3);
  };

  return (
    <div className="search-result">
      {isLoading && (
        <>
          <div className="search-result__loading">
            <span class="search-result__loading-loader"></span>
            <p className="search-result__loading-text">Searching for news...</p>
          </div>
        </>
      )}
      {!isLoading && defaultNews.length === 0 && (
        <>
          <div className="search-result__not-found">
            <img
              src={notFound}
              alt="Not Found"
              className="search-result__not-found-img"
            />
            <h3 className="search-result__not-found-title">Not Found</h3>
            <p className="search-result__not-found-paragraph">
              Sorry, but nothing matched your search terms.
            </p>
          </div>{" "}
        </>
      )}
      {!isLoading && defaultNews.length > 0 && (
        <>
          <h1 className="search-result__title">Search results</h1>
          <ul className="search-result__cards-list">
            {defaultNews.slice(0, visiableCard).map((item) => {
              return (
                <NewsCard
                  key={`${item.url}`}
                  item={item}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
          </ul>
          {visiableCard < defaultNews.length && (
            <button
              className="search-reasult__show-more"
              onClick={showAllCards}
            >
              Show more
            </button>
          )}
          {visiableCard > 3 && (
            <button className="search-reasult__show-more" onClick={show3Cards}>
              Show less
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResult;
