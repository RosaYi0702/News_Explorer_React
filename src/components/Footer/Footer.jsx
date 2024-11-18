import "./Footer.css";
import { Link } from "react-router-dom";
import gitHub from "../../assets/gitHub.png";
import fb from "../../assets/fb.png";
import { TripleTenUrl } from "../../utils/constants";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2024 Yi Hui Lin, Powered by News API
      </p>
      <ul className="footer__button-list">
        <div className="footer__text-button">
          <li className="footer__text-button-item">
            <Link to="/" className="footer__link">
              Home
            </Link>
          </li>

          <li className="footer__text-button-item">
            <Link className="footer__link" to={TripleTenUrl}>
              TripelTen
            </Link>
          </li>
        </div>
        <div className="footer__icon-button">
          <li className="footer__icon-button-item">
            <a href="https://github.com/RosaYi0702" className="footer__link">
              <img src={gitHub} alt="GitHub" className="footer__social-icon" />
            </a>
          </li>
          <li className="footer__icon-button-item">
            <a
              href="https://www.facebook.com/tripleten.tech"
              className="footer__link"
            >
              <img src={fb} alt="Facebook" className="footer__social-icon" />
            </a>
          </li>
        </div>
      </ul>
    </footer>
  );
}

export default Footer;
