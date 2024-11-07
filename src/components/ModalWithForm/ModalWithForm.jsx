import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        {" "}
        <button className="modal__close" type="button">
          <img src={close} alt="close-btn" className="modal__close-img" />
        </button>
        <h2 className="modal__title">Sign Up</h2>
        <form className="modal__form">
          <label htmlFor="email" className="modal__label">
            Email
            <input
              className="modal__input"
              type="email"
              id="registerEmail"
              placehodler="Email"
              name="email"
            ></input>
          </label>
          <label html="password" className="modal__label">
            Password
            <input
              className="modal__input"
              type="password"
              id="registerPassword"
              placehodler="Password"
              name="password"
            ></input>
          </label>
          <label html="userName" className="modal__label">
            UserName
            <input
              className="modal__input"
              type="text"
              id="userName"
              placehodler="User Name"
              name="userName"
            ></input>
          </label>
          <button type="submit" className="modal__submit-btn">
            Sign Up
          </button>
          <div className="modal__submit_or">
            or
            <button className="modal__submit-or-btn">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
