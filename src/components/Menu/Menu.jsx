import "./Menu.css";
import { Link } from "react-router-dom";
import WhiteLogo from "../../assets/WhiteLogo.png";
import Close from "../../assets/close.png";
import WhiteLogOut from "../../assets/WhiteLogOut.png";

function Menu({ isLoggedIn, toggleMenu, handleSignInModal }) {
  return (
    <>
      <div className="menu">
        <div className="menu__content">
          <div className="menu__header">
            <Link to="/">
              <img src={WhiteLogo} alt="Logo" className="menu__logo" />
            </Link>
            <button className="menu__close" onClick={toggleMenu}>
              <img src={Close} alt="Menu icon" className="menu__close-img" />
            </button>
          </div>
          <div className={`menu__btn `}>
            <Link to="/" className="menu__home-btn">
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link className="menu__saved-articles-btn" to="/saved-news">
                  Saved articles
                </Link>

                <button className={`menu__log-out`}>
                  <p className="menu__user-name">Elisa</p>
                  <img
                    src={WhiteLogOut}
                    alt="Log Out icon"
                    className="menu__log-out_img"
                  />
                </button>
              </>
            ) : (
              <button className="menu__sign-in-btn" onClick={handleSignInModal}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;