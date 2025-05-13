// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./card-introduction.module.scss";

const CardIntroduction = () => {
  return (
    <div className="parent">
      <div className="card">
        <div className="content-box">
          <span className="card-title">Learning</span>
          <p className="card-content">
            A learning support system that allows them to study autonomously
            outside of school for free or at a low cost.
          </p>
          <span className="see-more">See More</span>
        </div>
      </div>
    </div>
  );
};

export default CardIntroduction;
