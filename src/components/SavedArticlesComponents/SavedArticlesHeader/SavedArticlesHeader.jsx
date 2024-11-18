import "./SavedArticlesHeader.css";
import { defaultNews } from "../../../utils/constants";

function SavedArticlesHeader({ currentUser }) {
  return (
    <>
      <div className="saved-articles-header">
        <h3 className="saved-articles-header__title">Saved articles</h3>
        <h1 className="saved-articles-header__news-amount">
          {currentUser}, you have {defaultNews.length} saved articles
        </h1>
      </div>
      <p className="saved-articles-header__keywords">
        By keywords: <span>Nature, Yellowstone, and 2 other</span>
      </p>
    </>
  );
}

export default SavedArticlesHeader;
