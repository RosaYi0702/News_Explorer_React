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
        <SavedArticlesHeader currentUser={currentUser} />
        <SavedCardMain />
      </div>
    </>
  );
}

export default SavedArticle;
