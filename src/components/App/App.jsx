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
import {
  fetchNews,
  saveArticleItem,
  unsaveArticleItem,
  getSavedArticles,
} from "../../utils/NewsApi";
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
  const [savedArticles, setSavedArticles] = useState({ items: [] });

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setActiveModal("");
    window.location.reload();
  };

  const handleSignInModal = () => {
    setActiveModal("log-in");
  };

  const handleSignUpModal = () => {
    setActiveModal("register");
  };

  const handleSuccessfulModal = () => {
    setActiveModal("successful");
  };

  const handleSignOut = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const handleSaveArticle = (article) => {
    const token = getToken();

    const saveNewArticleItem = {
      source: {
        id: article.source?.id,
        name: article.source?.name,
      },
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content,
      keyword: article.keyword,
      saved: true,
    };
    console.log("saveNewArticleItem:", saveNewArticleItem);
    saveArticleItem(saveNewArticleItem, token)
      .then((data) => {
        console.log("new Saved article:", data.item);

        setSavedArticles((prevSavedArticles) => {
          const items = prevSavedArticles.items || [];
          const updatedItems = [data.item, ...items];
          return { ...prevSavedArticles, items: updatedItems };
        });
        console.log("savedArticles:", savedArticles);
      })
      .catch((err) => {
        console.error("Failed to save article. Please try again.", err);
      });
  };

  const handleUnsaveArticle = (id) => {
    const token = getToken();
    console.log("Unsave Article ID:", id);
    console.log("Unsave Token: ", token);
    unsaveArticleItem(id, token)
      .then(() => {
        const updatedItems = savedArticles.items.filter(
          (item) => item._id !== id
        );
        console.log("handleUnsavedArticle/updateItems: ", updatedItems);
        return setSavedArticles((prevState) => ({
          ...prevState,
          items: updatedItems,
        }));
      })
      .catch((err) => {
        console.error("Failed to unsave article. Please try again.", err);
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
        } else {
          setNewsData([]);
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
        if (data?.token) {
          setIsLoggedIn(true);
          setToken(data.token);
          console.log("data:", data);
          return getUserInfo(data.token);
        } else {
          throw new Error("No token received during signup.");
        }
      })
      .then((userData) => {
        if (userData && userData.name) {
          setCurrentUser({ name: userData.name });
        }
        handleSuccessfulModal();
      })
      .catch((err) => {
        console.error("Error:", err);
        if (err && (err?.status === 404 || err?.response?.status === 404)) {
          setCurrentUser({ username: formData.username });
          handleCloseModal();
        } else if (
          err &&
          (err?.status === 409 || err?.response?.status === 409)
        ) {
          console.error("Email already exists: ", err);
          setError(true);
        } else {
          console.error("Sign up failed: ", err);
          setError(true);
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
        setIsLoggedIn(true);
        setToken(data.token);
        return getUserInfo(data.token);
      })
      .then((userData) => {
        if (userData && userData.name) {
          setCurrentUser({ name: userData.name });
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
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          removeToken();
        });
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    getSavedArticles(token)
      .then((handleSaveArticle) => {
        setSavedArticles(handleSaveArticle);
      })
      .catch((err) => {
        console.error("Failed to fetch saved articles. Please try again.", err);
      });
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
                  handleSaveArticle={handleSaveArticle}
                  handleUnsaveArticle={handleUnsaveArticle}
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
                    handleSaveArticle={handleSaveArticle}
                    handleUnsaveArticle={handleUnsaveArticle}
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
