import { Link } from "react-router-dom";

const Footer = ({ settings }) => {
  return (
    <section className="footer-section">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-4">
            <div className="fs-about">
              <div className="fa-logo">
                <a href="#">
                  <img src={settings?.logo} alt="Gym Logo" />
                </a>
              </div>
              <p>{settings?.address}</p>
              <div className="fa-social">
                <Link to={settings?.facebookUrl} target="_blank">
                  <i className="fa fa-facebook"></i>
                </Link>
                <Link to={settings?.instagramUrl} target="_blank">
                  <i className="fa fa-instagram"></i>
                </Link>
                <Link to={`mailto:${settings?.email}`}>
                  <i className="fa fa-envelope-o"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="fs-widget">
              <h4>Useful links</h4>
              <ul>
                <li>
                  <Link to="/about-us">About</Link>
                </li>
                <li>
                  <Link to="/classes">Classes</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="fs-widget">
              <h4>Support</h4>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                {/* <li>
                  <a href="#">My account</a>
                </li> */}
                {/* <li>
                  <a href="#">Subscribe</a>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Tips & Guides */}
          <div className="col-lg-4 col-md-6">
            <div className="fs-widget">
              <h4>Tips & Guides</h4>
              <div className="fw-recent">
                <h6>
                  <a href="./blog-details.html">
                    Physical fitness may help prevent depression, anxiety
                  </a>
                </h6>
                <ul>
                  <li>3 min read</li>
                  <li>20 Comment</li>
                </ul>
              </div>
              <div className="fw-recent">
                <h6>
                  <a href="./blog-details.html">
                    Fitness: The best exercise to lose belly fat and tone up...
                  </a>
                </h6>
                <ul>
                  <li>3 min read</li>
                  <li>20 Comment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="copyright-text">
              <p>
                Copyright &copy;
                {new Date().getFullYear()} All rights reserved | This{" "}
                {settings?.websiteName} Website is made with{" "}
                <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                <a
                  href="https://github.com/Sajed-Saidi"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sajed Saidi
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
