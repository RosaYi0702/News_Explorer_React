import "./HomePage.css";
import Header from "../../Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import AboutAuthor from "../AboutAuthor/AboutAuthor";
import SearchResult from "../SearchResult/SearchResult";

function HomePage({ handleSignInModal, isLoggedIn }) {
  return (
    <>
      <div className="page__home">
        <Header handleSignInModal={handleSignInModal} isLoggedIn={isLoggedIn} />
        <SearchPage />
      </div>
      <SearchResult isLoggedIn={isLoggedIn} />
      <AboutAuthor />
    </>
  );
}

export default HomePage;
