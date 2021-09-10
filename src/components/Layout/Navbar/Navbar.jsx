import { Images } from "../../../constants/Image";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
                  <span className="designation">Prof.</span>
                  <span className="d-block">Charles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
