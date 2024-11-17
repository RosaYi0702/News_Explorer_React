import "./SavedArticles.css";
import Header from "../../Header/Header";
import SavedArticlesHeader from "../SavedArticlesHeader/SavedArticlesHeader";
import SavedCardMain from "../SavedCardsMain/SavedCardsMain";

function SavedArticle({ isLoggedIn, isMenuOpened, toggleMenu, handleSignOut }) {
  return (
    <>
      <div className="page__saved-article">
        <Header
          isLoggedIn={isLoggedIn}
          isMenuOpened={isMenuOpened}
          toggleMenu={toggleMenu}
          handleSignOut={handleSignOut}
        />
        <SavedArticlesHeader />
        <SavedCardMain />
      </div>
    </>
  );
}

export default SavedArticle;
