import { Images } from "../../../constants/Image";

export const Navbar = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="header-wrap">
              <p className="logo">QSSSA</p>

              <div className="user-info">
                <figure>
                  <img src={Images.person.default} />
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
