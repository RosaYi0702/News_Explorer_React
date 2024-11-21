import "./SearchResult.css";
import NewsCard from "../../NewsCard/NewsCard";
import { useState } from "react";
import notFound from "../../../assets/notFound.png";

function SearchResult({ isLoggedIn, isLoading, newsData, toggleSaved }) {
  const [visiableCard, setVisiableCard] = useState(3);

  const filterNewsData = newsData.filter((item) => item.title !== "[Removed]");

  const showAllCards = () => {
    setVisiableCard(newsData.length);
  };

  const show3Cards = () => {
    setVisiableCard(3);
  };

  return (
    <div className="search-result">
      {isLoading && (
        <>
          <div className="search-result__loading">
            <span className="search-result__loading-loader"></span>
            <p className="search-result__loading-text">Searching for news...</p>
          </div>
        </>
      )}
      {!isLoading && newsData.length === 0 && (
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
      {!isLoading && newsData.length > 0 && (
        <>
          <h1 className="search-result__title">Search results</h1>
          <ul className="search-result__cards-list">
            {filterNewsData.slice(0, visiableCard).map((item, index) => {
              return (
                <NewsCard
                  key={`${item.source.id}${index}`}
                  item={item}
                  isLoggedIn={isLoggedIn}
                  toggleSaved={toggleSaved}
                />
              );
            })}
          </ul>
          {visiableCard < newsData.length && (
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
