export const StudentPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="form-main customize-form">
            <div className="form-wrap">
              <h1>Enter your code here:</h1>
              <div className="code-main">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Code"
                    className="form-control mb-0"
                  />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-small btn-primary">
                      {/* <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"></span>*/}
                      Go!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
