import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import WhiteLogo from "../../assets/WhiteLogo.png";
import BlackLogo from "../../assets/BlackLogo.png";
import WhiteLogOut from "../../assets/WhiteLogOut.png";
import BlackLogOut from "../../assets/BlackLogOut.png";

function Header({ handleSignInModal, isLoggedIn }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img
            src={isHomePage ? WhiteLogo : BlackLogo}
            alt="Logo"
            className="header__logo"
          />
        </Link>
        <div className={`header__btn `}>
          <button
            className={`header__home-btn ${
              isHomePage ? "" : "header__home-btn--black"
            }`}
          >
            Home
          </button>
          {isLoggedIn ? (
            <>
              <Link className="header__saved-articles" to="/saved-news">
                <button
                  className={`header__saved-articles-btn ${
                    isHomePage ? "" : "header__saved-articles-btn--black"
                  }`}
                >
                  Saved articles
                </button>
              </Link>

              <button
                className={`header__log-out ${
                  isHomePage ? "" : "header__log-out--black"
                }`}
              >
                <p className="header__user-name">Elisa</p>
                <img
                  src={isHomePage ? WhiteLogOut : BlackLogOut}
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
      </nav>
    </header>
  );
}

export default Header;
