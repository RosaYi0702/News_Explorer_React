import "./HomePage.css";
import Header from "../../Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import AboutAuthor from "../AboutAuthor/AboutAuthor";
import SearchResult from "../SearchResult/SearchResult";

function HomePage({
  handleSignInModal,
  isLoggedIn,
  isLoading,
  isMenuOpened,
  toggleMenu,
  handleSignOut,
  currentUser,
}) {
  return (
    <>
      <div className="page__home">
        <Header
          handleSignInModal={handleSignInModal}
          isLoggedIn={isLoggedIn}
          isMenuOpened={isMenuOpened}
          toggleMenu={toggleMenu}
          handleSignOut={handleSignOut}
          currentUser={currentUser}
        />
        <SearchPage isMenuOpened={isMenuOpened} isLoggedIn={isLoggedIn} />
      </div>
      <SearchResult isLoggedIn={isLoggedIn} isLoading={isLoading} />
      <AboutAuthor />
    </>
  );
}

export default HomePage;
