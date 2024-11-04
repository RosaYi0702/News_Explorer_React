import "./App.css";
import Header from "../Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <div className="page__home">
          <Header />
          <SearchPage />
        </div>

        <Main />
        <Footer />
      </div>
      <ModalWithForm />
    </div>
  );
}

export default App;
