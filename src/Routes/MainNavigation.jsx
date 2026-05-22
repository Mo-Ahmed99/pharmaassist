import "./MainNavigationStyle.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";

export default function MainNavigation() {
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

            <li className="nav-item">
              <Link className="nav-link feature-link" to="/drugalternative">
                <FontAwesomeIcon icon={faRotate} />
                <span>Drug Alternative</span>
              </Link>
            </li>
          </ul>

          {/* Right Buttons */}
          <div className="d-flex flex-column flex-lg-row gap-3 mt-3 mt-lg-0">
            <Link className="login-btn text-center" to="/">
              Login
            </Link>

            <Link className="signup-btn text-center" to="/">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
