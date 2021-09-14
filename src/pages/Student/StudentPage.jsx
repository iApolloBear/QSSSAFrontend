import { CodeForm } from "../../components/Student/CodeForm";

export const StudentPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="form-main customize-form">
            <CodeForm />
          </div>
        </div>
      </div>
    </div>
  );
};
