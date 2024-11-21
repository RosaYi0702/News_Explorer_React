import "./SavedArticles.css";
import Header from "../../Header/Header";
import SavedArticlesHeader from "../SavedArticlesHeader/SavedArticlesHeader";
import SavedCardMain from "../SavedCardsMain/SavedCardsMain";

function SavedArticle({
  isLoggedIn,
  isMenuOpened,
  toggleMenu,
  handleSignOut,
  currentUser,
  savedArticles,
  toggleSaved,
}) {
  return (
    <>
      <div className="page__saved-article">
        <Header
          isLoggedIn={isLoggedIn}
          isMenuOpened={isMenuOpened}
          toggleMenu={toggleMenu}
          handleSignOut={handleSignOut}
          currentUser={currentUser}
        />
        <SavedArticlesHeader
          currentUser={currentUser}
          savedArticles={savedArticles}
        />
        <SavedCardMain
          savedArticles={savedArticles}
          toggleSaved={toggleSaved}
        />
      </div>
    </>
  );
}

export default SavedArticle;
