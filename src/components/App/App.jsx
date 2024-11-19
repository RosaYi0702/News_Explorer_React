import "./App.css";
import HomePage from "../HomePageComponents/HomePage/HomePage";
import SavedArticle from "../SavedArticlesComponents/SavedArticles/SavedArticles";
import Footer from "../Footer/Footer";
import LogInModal from "../LogInModal/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SuccessfulModal from "../SuccessfulModal/SuccessfulModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { fetchNews } from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("Rosa");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState("");
  const [hasSearchResult, setHasSearchResult] = useState(false);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSignInModal = () => {
    setActiveModal("log-in");
  };

  const handleSignUpModal = () => {
    setActiveModal("register");
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setError("");
    setHasSearchResult(true);
    fetchNews(keyword)
      .then((data) => {
        setNewsData(data.articles);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch newsData. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser }}
    >
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  handleSignInModal={handleSignInModal}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  isMenuOpened={isMenuOpened}
                  toggleMenu={toggleMenu}
                  handleSignOut={handleSignOut}
                  currentUser={currentUser}
                  onSearch={handleSearch}
                  newsData={newsData}
                  error={error}
                  hasSearchResult={hasSearchResult}
                />
              }
            ></Route>
            <Route
              path="/saved-newsData"
              element={
                <ProtectedRoute>
                  <SavedArticle
                    isLoggedIn={isLoggedIn}
                    isLoading={isLoading}
                    isMenuOpened={isMenuOpened}
                    toggleMenu={toggleMenu}
                    handleSignOut={handleSignOut}
                    currentUser={currentUser}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
        </div>

        <LogInModal
          isOpened={activeModal === "log-in"}
          handleCloseModal={handleCloseModal}
          handleSwitchModal={handleSignUpModal}
        />
        <RegisterModal
          isOpened={activeModal === "register"}
          handleCloseModal={handleCloseModal}
          handleSwitchModal={handleSignInModal}
        />
        <SuccessfulModal
          activeModal={activeModal}
          isOpened={activeModal === "successful"}
          handleCloseModal={handleCloseModal}
          handleSignInModal={handleSignInModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
