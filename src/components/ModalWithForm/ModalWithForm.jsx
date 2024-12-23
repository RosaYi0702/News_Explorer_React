import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({
  children,
  titleText,
  buttonText,
  secondButtonText,
  handleCloseModal,
  isOpened,
  handleSwitchModal,
  activeModal,
  handleSubmit,
  isInputEmpty,
}) {
  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__content">
        {" "}
        <button
          className="modal__close"
          type="button"
          onClick={handleCloseModal}
        >
          <img src={close} alt="close-btn" className="modal__close-img" />
        </button>
        <h2 className="modal__title">{titleText}</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
          {isOpened && activeModal === "successful" ? (
            ""
          ) : (
            <>
              <button
                type="submit"
                className={`modal__submit-btn ${
                  isInputEmpty ? "modal__submit-btn_disabled" : ""
                }`}
                disabled={isInputEmpty}
              >
                {buttonText}
              </button>
              <div className="modal__submit_or">
                or
                <button
                  type="button"
                  className="modal__submit-or-btn"
                  onClick={handleSwitchModal}
                >
                  {secondButtonText}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
