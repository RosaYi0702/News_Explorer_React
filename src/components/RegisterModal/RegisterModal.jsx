import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpened, handleCloseModal, handleSwitchModal }) {
  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText="Sign up"
      secondButtonText="Sign In"
      handleCloseModal={handleCloseModal}
      isOpened={isOpened}
      handleSwitchModal={handleSwitchModal}
    >
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
      <span className="modal__error_center">This email is not available</span>
    </ModalWithForm>
  );
}

export default RegisterModal;
