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
  savedArticles,
  setSavedArticles,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isBookmarkHovering, setIsBookmarkHovering] = useState(false);
  const [isTrashHovering, setIsTrashHovering] = useState(false);
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkNormal);
  const [currentItem, setCurrentItem] = useState(item);

  const determineBookmarkIcon = () => {
    const savedArticle = savedArticles?.items?.find(
      (savedArticle) => savedArticle.url === currentItem.url
    );
    return savedArticle
      ? bookmarkMarked
      : isBookmarkHovering
      ? bookmarkHover
      : bookmarkNormal;
  };

  const handleBookmarkClick = async (e) => {
    e.preventDefault();

    console.log("savedArticles:", savedArticles);
    console.log("savedArticles.items:", savedArticles.items);
    if (!isLoggedIn) return;

    const savedArticle = savedArticles?.items?.find(
      (savedArticle) => savedArticle.url === currentItem.url
    );
    if (savedArticle) {
      try {
        await handleUnsaveArticle(savedArticle._id);

        const updatedItem = savedArticles?.items?.filter(
          (article) => article._id !== savedArticle._id
        );
        setCurrentItem((prev) => ({ ...prev, saved: false }));
        console.log("Item saved status", currentItem.saved, "unsave");
        setSavedArticles({
          ...savedArticles,
          items: updatedItem.filter((item) => item !== undefined),
        });
        console.log("unsave / save Articles:", savedArticles);
      } catch (err) {
        console.error("Failed to unsave article: ", err);
      }
    } else {
      try {
        const newArticle = await handleSaveArticle(currentItem);
        console.log("Article saved:", newArticle);
        setCurrentItem({ ...currentItem, saved: true });
        setSavedArticles({
          ...savedArticles,
          items: [...savedArticles.items, newArticle].filter(
            (item) => item !== undefined
          ),
        });
        console.log("save / saveArticles:", savedArticles);
      } catch (err) {
        console.error("Failed to save article: ", err);
      }
    }
    setBookmarkIcon(determineBookmarkIcon());
  };

  const handleTrashClick = (e) => {
    e.preventDefault();
    handleUnsaveArticle(item._id);
    setIsTrashHovering(false);
  };

  const trashIcon = isTrashHovering ? trashHover : trashRegular;

  function formatDate(publishedAt) {
    const date = new Date(publishedAt);
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    setBookmarkIcon(determineBookmarkIcon());
  }, [isBookmarkHovering, savedArticles, item.url, determineBookmarkIcon]);

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
                    ? bookmarkIcon
                    : isBookmarkHovering
                    ? bookmarkHover
                    : bookmarkNormal
                }
                alt="bookmark"
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
