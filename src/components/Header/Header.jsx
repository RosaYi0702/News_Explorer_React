import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/WhiteLogo.png";
import logOut from "../../assets/logout.png";

function Header({ handleSignInModal, isLoggedIn }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <div className="header__btn">
          <button className="header__home-btn">Home</button>
          {isLoggedIn ? (
            <>
              <button className="header__saved-articles-btn">
                Saved articles
              </button>
              <Link to="/saved-news" className="header__log-out">
                <p className="header__user-name">Elisa</p>
                <img
                  src={logOut}
                  alt="Log Out icon"
                  className="header__log-out_img"
                />
              </Link>
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
