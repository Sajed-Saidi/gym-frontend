import { Link } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalProvider";

const OffCanvasMenu = ({ settings }) => {
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
    <>
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="fa fa-close"></i>
        </div>
        <div className="canvas-search search-switch">
          <i className="fa fa-search"></i>
        </div>
        <nav className="canvas-menu mobile-menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/plans">Plans</Link>
            </li>
            <li>
              <Link to="/classes">Classes</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {user ? (
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-user mr-2"></i>
                  {user?.name}
                </a>
                <ul className="dropdown">
                  <li>
                    <Link to="/account">Account</Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
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
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="canvas-social">
          <Link to={settings?.facebookUrl} target="_blank">
            <i className="fa fa-facebook"></i>
          </Link>
          <Link to={settings?.instagramUrl} target="_blank">
            <i className="fa fa-instagram"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OffCanvasMenu;
