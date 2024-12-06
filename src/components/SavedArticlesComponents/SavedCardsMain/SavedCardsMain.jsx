import "./SavedCardsMain.css";
import { defaultNews } from "../../../utils/constants";
import NewsCard from "../../NewsCard/NewsCard";

function SavedCardsMain({
  savedArticles,
  handleSaveArticle,
  handleUnsaveArticle,
  setSavedArticles,
}) {
  const articlesArray = savedArticles.items || [];
  console.log(articlesArray);
  return (
    <>
      <div className="saved-cards-main">
        <ul className="saved-cards__list">
          {articlesArray.map((item) => {
            return (
              <NewsCard
                key={`${item.url}`}
                item={item}
                handleSaveArticle={handleSaveArticle}
                handleUnsaveArticle={handleUnsaveArticle}
                setSavedArticles={setSavedArticles}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SavedCardsMain;
