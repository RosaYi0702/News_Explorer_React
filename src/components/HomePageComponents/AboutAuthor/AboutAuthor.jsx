import "./AboutAuthor.css";
import AuthorImage from "../../../assets/AuthorImage.png";

function AboutAuthor() {
  return (
    <div className="about-author">
      <img
        src={AuthorImage}
        alt="AuthorImage"
        className="about-author-author-img"
      />
      <div className="about-author__text">
        <h1 className="about-author__title">About the author</h1>
        <p className="about-author__paragraph">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.{" "}
          <br></br>
          <br></br> You can also talk about your experience with TripleTen, what
          you learned there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
}

export default AboutAuthor;
