import "./App.css";
import Header from "../Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import AboutAuthor from "../AboutAuthor/AboutAuthor";
import SearchResult from "../SearchResult/SearchResult";
import Footer from "../Footer/Footer";
import LogInModal from "../LogInModal/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSignInModal = () => {
    setActiveModal("log-in");
  };

  const handleSignUpModal = () => {
    setActiveModal("register");
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
                <>
                  <div className="page__home">
                    <Header
                      handleSignInModal={handleSignInModal}
                      isLoggedIn={isLoggedIn}
                    />
                    <SearchPage />
                  </div>
                  <SearchResult />
                  <AboutAuthor />
                </>
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
