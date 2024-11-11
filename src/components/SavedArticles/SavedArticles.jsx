import "./SavedArticles.css";
import Header from "../Header/Header";

function SavedArticle({ isLoggedIn }) {
  return (
    <>
      <div className="page__saved-article">
        <Header isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
}

export default SavedArticle;
