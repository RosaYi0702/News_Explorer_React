import "./SavedCardsMain.css";
import { defaultNews } from "../../../utils/constants";
import NewsCard from "../../NewsCard/NewsCard";

function SavedCardsMain({
  savedArticles,
  handleSaveArticle,
  handleUnsaveArticle,
}) {
  return (
    <>
      <div className="saved-cards-main">
        <ul className="saved-cards__list">
          {savedArticles.map((item) => {
            return (
              <NewsCard
                key={`${item.url}`}
                item={item}
                handleSaveArticle={handleSaveArticle}
                handleUnsaveArticle={handleUnsaveArticle}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SavedCardsMain;
