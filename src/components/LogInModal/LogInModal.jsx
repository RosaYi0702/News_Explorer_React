import "./LogInModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LogInModal({ isOpened, handleCloseModal, handleSwitchModal }) {
  return (
    <ModalWithForm
      titleText="Sign In"
      buttonText="Sign In"
      secondButtonText="Sign Up"
      handleCloseModal={handleCloseModal}
      isOpened={isOpened}
      handleSwitchModal={handleSwitchModal}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          id="loginEmail"
          placehodler="Email"
          name="email"
        ></input>
        <span className="modal__error">Invalid email address</span>
      </label>
      <label html="password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="loginPassword"
          placehodler="Password"
          name="password"
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default LogInModal;
