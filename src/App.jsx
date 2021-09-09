import { Navbar } from "./components/Layout/Navbar/Navbar";
import { Images } from "./constants/Image";
import { Inbox } from "./components/Home/Inbox";
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
                  <Inbox
                    text="Enter as Teacher"
                    image={Images.teacher.default}
                  />
                  <Inbox
                    text="Enter as Student"
                    image={Images.student.default}
                  />
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
