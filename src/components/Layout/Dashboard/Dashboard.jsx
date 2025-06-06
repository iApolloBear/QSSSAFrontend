import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link, NavLink } from "react-router-dom";

export const Dashboard = ({ children }) => {
  const {
    auth: { name, role },
    logout,
  } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-background"></div>
        <div className="sidebar-wrapper">
          <div className="logo d-flex flex-column align-items-start justify-content-start">
            <Link className="simple-text" to="/">
              QSSSA
            </Link>
            <span className="simple-text text-start">
              {role === "STUDENT_ROLE" && `Student: ${name}`}
              {role === "TEACHER_ROLE" && `Teacher: ${name}`}
              {role === "ADMIN_ROLE" && `Admin: ${name}`}
            </span>
          </div>
          <div className="nav">
            {role === "STUDENT_ROLE" && (
              <>
                <li>
                  <NavLink
                    exact
                    className="nav-link"
                    to="/qsssas"
                    activeClassName="active"
                  >
                    QSSSAS
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    className="nav-link"
                    to="/"
                    activeClassName="active"
                  >
                    Join us to QSSSA
                  </NavLink>
                </li>
              </>
            )}
            {role === "TEACHER_ROLE" && (
              <>
                <li>
                  <NavLink
                    exact
                    className="nav-link"
                    to="/students"
                    activeClassName="active"
                  >
                    Students
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    className="nav-link"
                    to="/qsssas"
                    activeClassName="active"
                  >
                    QSSSAS
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    className="nav-link"
                    to="/"
                    activeClassName="active"
                  >
                    Create new QSSSA
                  </NavLink>
                </li>
              </>
            )}
            {role === "ADMIN_ROLE" && (
              <>
                <li>
                  <NavLink
                    exact
                    className="nav-link"
                    to="/"
                    activeClassName="active"
                  >
                    Students
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    className="nav-link"
                    to="/teachers"
                    activeClassName="active"
                  >
                    Teachers
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    exact
                    className="nav-link"
                    to="/qsssas"
                    activeClassName="active"
                  >
                    QSSSAS
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="main-panel">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="navbar-collapse collapse show">
              <div className="ms-auto navbar-nav">
                <div className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-primary btn-small"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="content">
          <div className="container-fluid">
            <div className="row">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
