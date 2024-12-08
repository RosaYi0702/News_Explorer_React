import "./LogInModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LogInModal({
  isOpened,
  handleCloseModal,
  handleSwitchModal,
  handleLogin,
  error,
}) {
  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };
  return (
    <ModalWithForm
      titleText="Sign In"
      buttonText="Sign In"
      secondButtonText="Sign Up"
      handleCloseModal={handleCloseModal}
      isOpened={isOpened}
      handleSwitchModal={handleSwitchModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          id="loginEmail"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        ></input>
        {error ? (
          <span className="modal__error">Invalid email address</span>
        ) : (
          ""
        )}
      </label>
      <label html="password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="loginPassword"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default LogInModal;
