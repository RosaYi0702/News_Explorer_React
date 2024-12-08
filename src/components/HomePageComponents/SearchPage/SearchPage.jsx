import "./SearchPage.css";
import { useState } from "react";

function SearchPage({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      setError("Keyword cannot be empty.");
      return;
    }
    onSearch(keyword);
  };

  return (
    <>
      <div className="search-page">
        <div className="search-page__content">
          <h1 className="search-page__title">What's going on in the world?</h1>
          <p className="search-page__side-title">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <form onSubmit={handleFormSubmit} className="search-page__search-bar">
            <input
              type="text"
              className="search-page__search-input"
              placeholder={keyword === "" ? "Enter Topic" : keyword}
              onChange={handleInputChange}
              value={keyword}
            />
            <button className="search-page__search-button" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
