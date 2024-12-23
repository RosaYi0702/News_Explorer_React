import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import WhiteLogo from "../../assets/WhiteLogo.png";
import BlackLogo from "../../assets/BlackLogo.png";
import WhiteLogout from "../../assets/WhiteLogOut.png";
import BlackLogout from "../../assets/BlackLogOut.png";
import WhiteMenu from "../../assets/WhiteMenu.png";
import BlackMenu from "../../assets/BlackMenu.png";
import Menu from "../Menu/Menu";

function Header({
  handleSignInModal,
  isLoggedIn,
  isMenuOpened,
  toggleMenu,
  handleSignOut,
  currentUser,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`header ${
        isMenuOpened
          ? isHomePage
            ? "header__home_menu-opened"
            : "header__saved-articles_menu-opened "
          : ""
      }`}
    >
      <nav className={`header__nav `}>
        <Link to="/">
          <img
            src={isHomePage ? WhiteLogo : BlackLogo}
            alt="Logo"
            className="header__logo"
          />
        </Link>
        <button className="header__menu" onClick={toggleMenu}>
          <img
            src={isHomePage ? WhiteMenu : BlackMenu}
            alt="Menu icon"
            className="header__menu-icon"
          />
        </button>

        <div className={`header__btn `}>
          <Link
            to="/"
            className={`header__home-btn ${
              isHomePage ? "" : "header__home-btn--black"
            }`}
          >
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                className={`header__saved-articles-btn ${
                  isHomePage ? "" : "header__saved-articles-btn--black"
                }`}
                to="/saved-news"
              >
                Saved articles
              </Link>

              <button
                className={`header__log-out ${
                  isHomePage ? "" : "header__log-out--black"
                }`}
                onClick={handleSignOut}
              >
                <p className="header__user-name">{currentUser.username}</p>
                <img
                  src={isHomePage ? WhiteLogout : BlackLogout}
                  alt="Log Out icon"
                  className="header__log-out_img"
                />
              </button>
            </>
          ) : (
            <button className="header__sign-in-btn" onClick={handleSignInModal}>
              Sign In
            </button>
          )}
        </div>
        {isMenuOpened ? (
          <Menu
            isLoggedIn={isLoggedIn}
            toggleMenu={toggleMenu}
            handleSignInModal={handleSignInModal}
            currentUser={currentUser}
            handleSignOut={handleSignOut}
          />
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}

export default Header;
