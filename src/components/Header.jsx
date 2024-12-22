import { Link } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalProvider";

const Header = ({ location, settings }) => {
  const isActive = (path) => location.pathname === path;

  const { showNotification, user, logout } = useGlobal();

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response) {
        showNotification(response.message, "success");
      }
    } catch (error) {
      showNotification(error?.message, "error");
    }
  };

  return (
    <header className="header-section">
      <div className="container-fluid">
        <div className="row">
          {/* Logo Section */}
          <div className="col-lg-3">
            <div className="logo">
              <Link to="/">
                <img src={settings?.logo} alt="Gym Logo" />
              </Link>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="col-lg-6">
            <nav className="nav-menu">
              <ul>
                <li className={isActive("/") ? "active" : ""}>
                  <Link to="/">Home</Link>
                </li>
                <li className={isActive("/plans") ? "active" : ""}>
                  <Link to="/plans">Plans</Link>
                </li>
                <li className={isActive("/classes") ? "active" : ""}>
                  <Link to="/classes">Classes</Link>
                </li>
                <li className={isActive("/about-us") ? "active" : ""}>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li className={isActive("/contact") ? "active" : ""}>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social and Search Options */}
          <div className="col-lg-3">
            <div className="top-option">
              <div className="to-search search-switch">
                <nav className="nav-menu">
                  <ul>
                    {user ? (
                      <li>
                        <a href="#">
                          <i className="fa fa-user mr-2"></i>
                          {user?.name}
                        </a>
                        <ul className="dropdown">
                          <li>
                            <Link to="/account">Account</Link>
                          </li>
                          <li>
                            <a href="#" onClick={handleLogout}>
                              Logout
                            </a>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    )}
                    <li>
                      <div className="to-social">
                        <Link to={settings?.facebookUrl} target="_blank">
                          <i className="fa fa-facebook"></i>
                        </Link>
                        <Link to={settings?.instagramUrl} target="_blank">
                          <i className="fa fa-instagram"></i>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Open Button */}
        <div className="canvas-open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
