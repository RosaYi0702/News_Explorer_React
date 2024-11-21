import "./SavedCardsMain.css";
import { defaultNews } from "../../../utils/constants";
import NewsCard from "../../NewsCard/NewsCard";

function SavedCardsMain({ savedArticles, toggleSaved }) {
  return (
    <>
      <div className="saved-cards-main">
        <ul className="saved-cards__list">
          {savedArticles.map((item) => {
            return (
              <NewsCard
                key={`${item.url}`}
                item={item}
                toggleSaved={toggleSaved}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SavedCardsMain;
