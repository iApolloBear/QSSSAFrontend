import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Images } from "../../../constants/Image";
import { Link } from "react-router-dom";
import { RoomContext } from "../../../context/RoomContext";

export const Navbar = () => {
  const {
    auth: { name, role },
    logout,
  } = useContext(AuthContext);
  const { leave } = useContext(RoomContext);

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
                <Link to="/qsssas" className="me-4">
                  QSSSA'S
                </Link>
                <figure>
                  <img src={Images.person.default} alt="nav-person-icon" />
                </figure>
                <div>
                  {role === "TEACHER_ROLE" && (
                    <span className="designation">Prof.</span>
                  )}
                  {name && <span className="d-block">{name}</span>}
                </div>
                <button
                  onClick={() => {
                    logout();
                    leave();
                  }}
                  className="btn btn-small ms-3"
                >
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
