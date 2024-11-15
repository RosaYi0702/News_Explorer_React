import "./SavedArticles.css";
import Header from "../../Header/Header";
import SavedArticlesHeader from "../SavedArticlesHeader/SavedArticlesHeader";
import SavedCardMain from "../SavedCardsMain/SavedCardsMain";

function SavedArticle({ isLoggedIn }) {
  return (
    <>
      <div className="page__saved-article">
        <Header isLoggedIn={isLoggedIn} />
        <SavedArticlesHeader />
        <SavedCardMain />
      </div>
    </>
  );
}

export default SavedArticle;