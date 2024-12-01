import "./SavedArticlesHeader.css";
import { defaultNews } from "../../../utils/constants";

function SavedArticlesHeader({ currentUser, savedArticles }) {
  const allkeywaords = savedArticles.flatMap((article) => article.keyword);
  const uniqueKeywords = [...new Set(allkeywaords)];

  const displayedKeywords = uniqueKeywords.slice(0, 2);
  const otherKeywordsCount = uniqueKeywords.length - 2;
  return (
    <>
      <div className="saved-articles-header">
        <h3 className="saved-articles-header__title">Saved articles</h3>
        <h1 className="saved-articles-header__news-amount">
          {currentUser.username}, you have {savedArticles.length} saved articles
        </h1>
      </div>
      <p className="saved-articles-header__keywords">
        By keywords:{" "}
        <span>
          {displayedKeywords.join(", ")}
          {otherKeywordsCount > 0 && `, and ${otherKeywordsCount} other`}
        </span>
      </p>
    </>
  );
}

export default SavedArticlesHeader;
