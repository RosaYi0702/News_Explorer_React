import "./NewsCard.css";
import bookmarkNormal from "../../assets/bookmark/normal.png";
import bookmarkHover from "../../assets/bookmark/hover.png";
import bookmarkMarked from "../../assets/bookmark/marked.png";
import trashRegular from "../../assets/trashRegular.png";
import trashHover from "../../assets/trashHover.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import notFound from "../../assets/notFound.png";

function NewsCard({
  item,
  isLoggedIn,
  handleSaveArticle,
  handleUnsaveArticle,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isBookmarkHovering, setIsBookmarkHovering] = useState(false);
  const [isTrashHovering, setIsTrashHovering] = useState(false);
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkNormal);
  const [currentItem, setCurrentItem] = useState(item);

  const determineIcon = () => {
    if (isLoggedIn) {
      return item.saved
        ? bookmarkMarked
        : isBookmarkHovering
        ? bookmarkHover
        : bookmarkNormal;
    }
    return bookmarkNormal;
  };

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      console.log(currentItem.saved);
      console.log("currentItem ", currentItem);

      if (currentItem.saved) {
        await handleUnsaveArticle(currentItem._id);
        console.log("Item saved status", currentItem.saved, "unsave");
      } else {
        await handleSaveArticle(currentItem);
        console.log("Item saved status", currentItem.saved, "save");
      }
      currentItem.saved = !currentItem.saved;
      setBookmarkIcon(determineIcon());
    }
  };

  const handleTrashClick = (e) => {
    e.preventDefault();
    handleUnsaveArticle(item._id);
  };

  const trashIcon = isTrashHovering ? trashHover : trashRegular;

  function formatDate(publishedAt) {
    const date = new Date(publishedAt);
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    setBookmarkIcon(determineIcon());
  }, [isLoggedIn, currentItem.saved, isBookmarkHovering]);

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
            <button
              className="news-card__bookmark"
              onClick={handleBookmarkClick}
            >
              <img
                src={
                  isLoggedIn
                    ? determineIcon()
                    : isBookmarkHovering
                    ? bookmarkHover
                    : bookmarkNormal
                }
                alt="booknmark"
                className="news-card__bookmark-img"
                onMouseEnter={() => setIsBookmarkHovering(true)}
                onMouseLeave={() => setIsBookmarkHovering(false)}
              />
            </button>
            {isLoggedIn ? null : (
              <div className="news-card__signIn-reminder">
                Sign in to save articles
              </div>
            )}
          </>
        ) : (
          <>
            <button className="news-card__trash " onClick={handleTrashClick}>
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
        {isHomePage ? (
          ""
        ) : (
          <div className="news-card__keywords">{item.keyword}</div>
        )}
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
