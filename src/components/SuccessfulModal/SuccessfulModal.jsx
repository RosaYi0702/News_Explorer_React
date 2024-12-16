import "./SuccessfulModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SuccessfulModal({
  handleCloseModal,
  isOpened,
  handleSignInModal,
  activeModal,
}) {
  return (
    <ModalWithForm
      handleCloseModal={handleCloseModal}
      isOpened={isOpened}
      handleSignInModal={handleSignInModal}
      activeModal={activeModal}
    >
      <div className="successful-modal">
        <h1 className="successful-modal__text">
          Registration successfully completed!
        </h1>
        <button
          className="successful-modal__sign-in-btn"
          onClick={handleSignInModal}
        >
          Sign in
        </button>
      </div>
    </ModalWithForm>
  );
}

export default SuccessfulModal;
