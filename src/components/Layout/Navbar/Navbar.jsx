import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Images } from "../../../constants/Image";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const {
    auth: { name },
    logout,
  } = useContext(AuthContext);

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="header-wrap">
              <Link to="/">
                <p className="logo">QSSSA</p>
              </Link>

              <div className="user-info">
                <figure>
                  <img src={Images.person.default} alt="nav-person-icon" />
                </figure>
                <div>
                  {/*
                   *<span className="designation">Prof.</span>
                   */}
                  {name && <span className="d-block">{name}</span>}
                </div>
                <button onClick={logout} className="btn btn-small ms-3">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
