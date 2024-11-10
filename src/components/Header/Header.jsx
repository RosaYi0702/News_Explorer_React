import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/WhiteLogo.png";

function Header({ handleSignInModal }) {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <div className="header__btn">
          <button className="header__home-btn">Home</button>
          <button className="header__sign-in-btn" onClick={handleSignInModal}>
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
