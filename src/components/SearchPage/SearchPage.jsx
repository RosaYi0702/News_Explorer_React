import "./SearchPage.css";

function SearchPage() {
  return (
    <>
      <div className="search-page">
        <div className="search-page__content">
          <h1 className="search-page__title">What's going on in the world?</h1>
          <p className="search-page__side-title">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <form action="submit" className="search-page__search-bar">
            <input
              type="text"
              className="search-page__search-input"
              placeholder="Enter Topic"
            />
            <button className="search-page__search-button">Search</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
