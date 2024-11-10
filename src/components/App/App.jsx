import "./App.css";
import Header from "../Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import AboutAuthor from "../AboutAuthor/AboutAuthor";
import SearchResult from "../SearchResult/SearchResult";
import Footer from "../Footer/Footer";
import LogInModal from "../LogInModal/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useState } from "react";
import { Route } from "react-router-dom";

function App() {
  const [activeModal, setActiveModal] = useState("");

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
    <div className="page">
      <div className="page__content">
        <div className="page__home">
          <Header handleSignInModal={handleSignInModal} />
          <SearchPage />
        </div>
        <SearchResult />
        <AboutAuthor />
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
  );
}

export default App;
