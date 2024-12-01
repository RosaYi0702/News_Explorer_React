import "./SavedCardsMain.css";
import { defaultNews } from "../../../utils/constants";
import NewsCard from "../../NewsCard/NewsCard";

function SavedCardsMain({ savedArticles, saveArticle, unsaveArticle }) {
  return (
    <>
      <div className="saved-cards-main">
        <ul className="saved-cards__list">
          {savedArticles.map((item) => {
            return (
              <NewsCard
                key={`${item.url}`}
                item={item}
                saveArticle={saveArticle}
                unsaveArticle={unsaveArticle}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SavedCardsMain;
