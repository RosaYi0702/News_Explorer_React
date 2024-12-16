import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useState, useEffect } from "react";

function RegisterModal({
  isOpened,
  handleCloseModal,
  handleSwitchModal,
  handleRegister,
  error,
}) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const [isInputEmpty, setIsInputEmpty] = useState(true);

  useEffect(() => {
    const isAnyInputEmpty = Object.values(values).some((input) => input === "");
    setIsInputEmpty(isAnyInputEmpty);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values);
  };
  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText="Sign up"
      secondButtonText="Sign In"
      handleCloseModal={handleCloseModal}
      isOpened={isOpened}
      handleSwitchModal={handleSwitchModal}
      handleSubmit={handleSubmit}
      isInputEmpty={isInputEmpty}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          id="registerEmail"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        ></input>
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="registerPassword"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        ></input>
      </label>
      <label htmlFor="userName" className="modal__label">
        UserName
        <input
          className="modal__input"
          type="text"
          id="userName"
          placeholder="User Name"
          name="username"
          value={values.username}
          onChange={handleChange}
        ></input>
      </label>
      {error ? (
        <span className="modal__error_center">This email is not available</span>
      ) : (
        ""
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
