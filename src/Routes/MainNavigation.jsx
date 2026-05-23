import "./MainNavigationStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotate, faStore } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

export default function MainNavigation() {
  const { user, isPharmacy, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand pharma-logo" to="/">
          PharmaAssist
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Center Links */}
          <ul className="navbar-nav mx-auto gap-lg-3 text-center">
            <li className="nav-item">
              <Link className="nav-link feature-link" to="/drugsearch">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>Drug Search</span>
              </Link>
            </li>
            {/* Pharmacy-only link */}
            {isPharmacy && (
              <li className="nav-item">
                <Link className="nav-link feature-link" to="/pharmacy/dashboard">
                  <FontAwesomeIcon icon={faStore} />
                  <span>My Pharmacy</span>
                </Link>
              </li>
            )}
          </ul>

          {/* Right Buttons */}
          <div className="d-flex flex-column flex-lg-row gap-3 mt-3 mt-lg-0 align-items-center">
            {user ? (
              <>

                <span className="nav-user-name"> {user.fullName} </span>
                <span className="nav-user-name"> {user.role}  </span>
                <button className="login-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="login-btn text-center" to="/">
                  Login
                </Link>
                <Link className="signup-btn text-center" to="/">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
