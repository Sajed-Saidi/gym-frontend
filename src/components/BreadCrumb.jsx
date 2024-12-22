import { Link } from "react-router-dom";
import breadcrumbBg from "../assets/img/breadcrumb-bg.jpg";

const BreadCrumb = ({ title }) => {
  return (
    <section
      className="breadcrumb-section set-bg"
      style={{ backgroundImage: `url(${breadcrumbBg})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb-text">
              <h2>{title}</h2>
              <div className="bt-option">
                <Link to="/">Home</Link>
                <span>{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadCrumb;
