import { Images } from "../constants/Image";
import { Inbox } from "../components/Home/Inbox";

export const HomePage = () => {
  return (
    <div className="home-main">
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
                  route="/teacher"
                />
                <Inbox
                  text="Enter as Student"
                  image={Images.student.default}
                  route="/student"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
