import { Link } from "react-router-dom";

const TrainingClass = ({ trClass }) => {
  return (
    <div
      key={trClass?.id}
      className={`col-lg-${
        trClass?.id === 4 || trClass?.id === 5 ? "6" : "4"
      } col-md-6`}
    >
      <div className="class-item">
        <div className="ci-pic">
          <img src={trClass?.image} alt={trClass?.name} />
        </div>
        <div className="ci-text">
          <span>{trClass?.category}</span>
          <h5>{trClass?.name}</h5>
          <Link to={`/class-details/${trClass?.id}`}>
            <i className="fa fa-angle-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainingClass;
