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
  onSearch,
  newsData,
  hasSearchResult,
  toggleSaved,
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
        <SearchPage
          isMenuOpened={isMenuOpened}
          isLoggedIn={isLoggedIn}
          onSearch={onSearch}
        />
      </div>
      {hasSearchResult ? (
        <SearchResult
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          newsData={newsData}
          toggleSaved={toggleSaved}
        />
      ) : (
        ""
      )}

      <AboutAuthor />
    </>
  );
}

export default HomePage;
