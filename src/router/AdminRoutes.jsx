import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink, Switch, Route, Redirect } from "react-router-dom";
import { Students } from "../pages/Admin/Students";
import { Teachers } from "../pages/Admin/Teachers";
import { QSSSAS } from "../pages/Admin/QSSSAS";

export const AdminRoutes = () => {
  const { logout } = useContext(AuthContext);

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
                to="/students"
                activeClassName="active"
              >
                Students
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/teachers"
                activeClassName="active"
              >
                Teachers
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to="/qsssas"
                activeClassName="active"
              >
                QSSSAS
              </NavLink>
            </li>
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
            <div className="row">
              <Switch>
                <Route exact path="/" component={Students} />
                <Route exact path="/teachers" component={Teachers} />
                <Route exact path="/qsssas" component={QSSSAS} />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
