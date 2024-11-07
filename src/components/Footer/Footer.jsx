import "./Footer.css";
import gitHub from "../../assets/gitHub.png";
import fb from "../../assets/fb.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2024 Yi Hui Lin, Powered by News API
      </p>
      <ul className="footer__button-list">
        <li className="footer__list-item">
          <a href="" className="footer__link">
            Home
          </a>
        </li>

        <li className="footer__list-item">
          <a href="" className="footer__link">
            TripelTen
          </a>
        </li>
        <li className="footer__list-item">
          <a href="" className="footer__link">
            <img src={gitHub} alt="GitHub" className="footer__social-icon" />
          </a>
        </li>
        <li className="footer__list-item">
          <a href="" className="footer__link">
            <img src={fb} alt="Facebook" className="footer__social-icon" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
