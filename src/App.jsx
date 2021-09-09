import { Navbar } from "./components/Layout/Navbar/Navbar";
import { Images } from "./constants/Image";
import "./styles/style.scss";

function App() {
  return (
    <>
      <Navbar />
      <div className="home-main">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-small mt-3 btn-secondary"
              >
                Clear previous data
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="home-wrap">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="title">
                  <h1>Welcome to QSSSA</h1>
                  <p>the learning system</p>
                </div>
                <div className="box-main">
                  <div className="inbox">
                    <figure>
                      <img src={Images.teacher.default} />
                    </figure>
                    Enter as Teacher
                  </div>
                  <div className="inbox">
                    <figure>
                      <img src={Images.student.default} />
                    </figure>
                    Enter as Student
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
