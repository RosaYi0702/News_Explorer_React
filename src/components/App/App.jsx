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
import { fetchNews } from "../../utils/NewsApi";
import { useNavigate } from "react-router-dom";
import { removeToken, setToken } from "../../utils/token";
import { getToken } from "../../utils/token";
import { signup, signin, getUserInfo } from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(false);
  const [hasSearchResult, setHasSearchResult] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

  const navigate = useNavigate();

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
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const toggleSaved = (url) => {
    setNewsData((prevNewsData) => {
      const updatedNewsData = prevNewsData.map((article) =>
        article.url === url ? { ...article, saved: !article.saved } : article
      );

      const toggledArticle = updatedNewsData.find(
        (article) => article.url === url
      );

      setSavedArticles((prevSavedArticles) => {
        if (toggledArticle.saved) {
          if (!prevSavedArticles.some((article) => article.url === url)) {
            return [...prevSavedArticles, toggledArticle];
          }
        } else {
          return prevSavedArticles.filter((article) => article.url !== url);
        }
        return prevSavedArticles;
      });

      return updatedNewsData;
    });
  };

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setError(false);
    setHasSearchResult(true);
    fetchNews(keyword)
      .then((data) => {
        if (Array.isArray(data)) {
          const updateArticles = data.map((article) => ({
            ...article,
            saved: false,
            keyword:
              keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase(),
          }));
          setNewsData(updateArticles);
          console.log("update articles", updateArticles);
        } else {
          setNewsData([]);
          console.log(data.articles);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch newsData. Please try again.", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = (formData) => {
    if (!formData.email || !formData.password || !formData.username) {
      setError(true);
      return;
    }

    signup(formData)
      .then((data) => {
        console.log(data);
        setIsLoggedIn(true);
        setToken(data.token);
        return getUserInfo(data.token);
      })
      .then(() => {
        setCurrentUser({ username: formData.username });
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error:", err);
        if (
          err &&
          (err.status === 404 || (err.response && err.response.status === 404))
        ) {
          setCurrentUser({ username: formData.username });
          handleCloseModal();
        } else if (err.message.includes("409")) {
          console.error("Email already exists: ", err);
          setError(true);
        } else {
          console.error("Sign up failed: ", err);
          setIsLoggedIn(false);
        }
      });
  };

  const handleLogin = (formData) => {
    if (!formData.email || !formData.password) {
      setError(true);
      return;
    }

    signin(formData)
      .then((data) => {
        console.log(data);
        setIsLoggedIn(true);
        setToken(data.token);
        return getUserInfo(data.token);
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser({ username: userData.username });
        }
      })
      .then(() => {
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Log in fail: ", err);
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
          console.log("User data retrieved:", userData);
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          removeToken();
        });
    }
  }, []);

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
                  hasSearchResult={hasSearchResult}
                  toggleSaved={toggleSaved}
                />
              }
            ></Route>
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute>
                  <SavedArticle
                    isLoggedIn={isLoggedIn}
                    isLoading={isLoading}
                    isMenuOpened={isMenuOpened}
                    toggleMenu={toggleMenu}
                    handleSignOut={handleSignOut}
                    currentUser={currentUser}
                    savedArticles={savedArticles}
                    toggleSaved={toggleSaved}
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
          handleLogin={handleLogin}
          error={error}
        />
        <RegisterModal
          isOpened={activeModal === "register"}
          handleCloseModal={handleCloseModal}
          handleSwitchModal={handleSignInModal}
          handleRegister={handleRegister}
          error={error}
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
