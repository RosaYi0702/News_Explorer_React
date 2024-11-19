import "./NewsCard.css";
import bookmarkNormal from "../../assets/bookmark/normal.png";
import bookmarkHover from "../../assets/bookmark/hover.png";
import bookmarkMarked from "../../assets/bookmark/marked.png";
import trashRegular from "../../assets/trashRegular.png";
import trashHover from "../../assets/trashHover.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import notFound from "../../assets/notFound.png";

function NewsCard({ item, isLoggedIn }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkHovering, setIsBookmarkHovering] = useState(false);
  const [isTrashHovering, setIsTrashHovering] = useState(false);

  const handleBookmarkClick = () => {
    if (isLoggedIn) {
      setIsBookmarked((prev) => !prev);
    }
  };

  const bookmarkIcon = isBookmarked
    ? bookmarkMarked
    : isBookmarkHovering
    ? bookmarkHover
    : bookmarkNormal;

  const trashIcon = isTrashHovering ? trashHover : trashRegular;

  function formatDate(publishedAt) {
    const date = new Date(publishedAt);
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className="news-card">
      <div className="news-card__content">
        <img
          src={item.urlToImage === null ? notFound : item.urlToImage}
          alt="news image"
          className="news-card__img"
        />
        {isHomePage ? (
          <>
            <button className="news-card__bookmark">
              <img
                src={
                  isLoggedIn
                    ? bookmarkIcon
                    : isBookmarkHovering
                    ? bookmarkHover
                    : bookmarkNormal
                }
                alt="booknmark"
                className="news-card__bookmark-img"
                onClick={handleBookmarkClick}
                onMouseEnter={() => setIsBookmarkHovering(true)}
                onMouseLeave={() => setIsBookmarkHovering(false)}
              />
            </button>
            {isLoggedIn ? (
              ""
            ) : (
              <div className="news-card__signIn-reminder">
                Sign in to save articles
              </div>
            )}
          </>
        ) : (
          <>
            <button className="news-card__trash ">
              <img
                src={trashIcon}
                alt="trash"
                className="news-card__trash-img"
                onMouseEnter={() => setIsTrashHovering(true)}
                onMouseLeave={() => setIsTrashHovering(false)}
              />
            </button>
            <div className="news-card__delete-warning">Remove from saved</div>
          </>
        )}
        {isHomePage ? "" : <div className="news-card__keywords">keywords</div>}
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
