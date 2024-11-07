import "./App.css";
import Header from "../Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import AboutAuthor from "../AboutAuthor/AboutAuthor";
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
        <AboutAuthor />
        <Footer />
      </div>
      <ModalWithForm />
    </div>
  );
}

export default App;
