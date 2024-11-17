import "./App.css";
import HomePage from "../HomePageComponents/HomePage/HomePage";
import SavedArticle from "../SavedArticlesComponents/SavedArticles/SavedArticles";
import Footer from "../Footer/Footer";
import LogInModal from "../LogInModal/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SuccessfulModal from "../SuccessfulModal/SuccessfulModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setIsLodding] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

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
    console.log("toggleMenu");
    setIsMenuOpened(!isMenuOpened);
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
                />
              }
            ></Route>
            <Route
              path="/saved-news"
              element={
                <SavedArticle
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  isMenuOpened={isMenuOpened}
                  toggleMenu={toggleMenu}
                  handleSignOut={handleSignOut}
                />
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
