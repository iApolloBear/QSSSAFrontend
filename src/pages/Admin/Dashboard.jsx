import { Link, NavLink } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-background"></div>
        <div className="sidebar-wrapper">
          <div className="logo d-flex align-items-center justify-content-start">
            <Link className="simple-text" to="/">
              QSSSA
            </Link>
          </div>
          <div className="nav">
            <li>
              <NavLink
                className="nav-link"
                to="/dashboard"
                activeClassName="active"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/login"
                activeClassName="active"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/register"
                activeClassName="active"
              >
                Register
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};
