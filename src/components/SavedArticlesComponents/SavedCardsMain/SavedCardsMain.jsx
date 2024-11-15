import "./SavedCardsMain.css";
import { defaultNews } from "../../../utils/constants";
import NewsCard from "../../NewsCard/NewsCard";

function SavedCardsMain() {
  return (
    <>
      <div className="saved-cards-main">
        <ul className="saved-cards__list">
          {defaultNews.map((item, index) => {
            return <NewsCard key={`${item.url}`} item={item} />;
          })}
        </ul>
      </div>
    </>
  );
}

export default SavedCardsMain;
