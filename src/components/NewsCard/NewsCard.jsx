import "./NewsCard.css";
import bookmarkNormal from "../../assets/bookmark/normal.png";

function NewsCard({ item }) {
  function formatDate(publishedAt) {
    const date = new Date(publishedAt);
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className="news-card">
      <div className="news-card__content">
        <img
          src={item.urlToImage}
          alt="news image"
          className="news-card__img"
        />
        <button className="news-card__bookmark">
          <img
            src={bookmarkNormal}
            alt="booknmark"
            className="news-card__bookmark-img"
          />
        </button>
        <div className="news-card__text">
          <p className="news-card__date">{formatDate(item.publishedAt)}</p>
          <h3 className="news-card__title">{item.title}</h3>
          <p className="news-card__description">{item.description}</p>
          <p className="news-card__from">{item.source.name}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
