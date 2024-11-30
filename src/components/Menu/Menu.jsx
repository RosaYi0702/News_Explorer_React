import "./Menu.css";
import { Link } from "react-router-dom";
import WhiteLogo from "../../assets/WhiteLogo.png";
import Close from "../../assets/close.png";
import WhiteLogout from "../../assets/WhiteLogOut.png";

function Menu({
  isLoggedIn,
  toggleMenu,
  handleSignInModal,
  currentUser,
  handleSignOut,
}) {
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
            <Link to="/" className="menu__home-btn" onClick={toggleMenu}>
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  className="menu__saved-articles-btn"
                  to="/saved-news"
                  onClick={toggleMenu}
                >
                  Saved articles
                </Link>

                <button className={`menu__log-out`} onClick={handleSignOut}>
                  <p className="menu__user-name">{currentUser}</p>
                  <img
                    src={WhiteLogout}
                    alt="Log Out icon"
                    className="menu__log-out_img"
                  />
                </button>
              </>
            ) : (
              <button
                className="menu__sign-in-btn"
                onClick={() => {
                  handleSignInModal();
                  toggleMenu();
                }}
              >
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
