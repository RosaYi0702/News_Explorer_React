import "./SavedArticlesHeader.css";

function SavedArticlesHeader() {
  return (
    <>
      <div className="saved-articles-header">
        <h3 className="saved-articles-header__title">Saved articles</h3>
        <h1 className="saved-articles-header__news-amount">
          Elise, you have 5 saved articles
        </h1>

        <p className="saved-articles-header__keywords">
          By keywords: <span>Nature, Yellowstone, and 2 other</span>
        </p>
      </div>
    </>
  );
}

export default SavedArticlesHeader;
