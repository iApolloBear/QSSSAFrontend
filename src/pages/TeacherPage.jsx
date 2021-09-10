export const TeacherPage = () => {
  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="form-main">
              <div className="form-wrap">
                <h1>Create a QSSSA</h1>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your topic name"
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your question"
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your Sentence Stem"
                />
                <label for="qsssa-image" className="btn btn-primary">
                  <input
                    className="d-none"
                    type="file"
                    name=""
                    id="qsssa-image"
                  />
                  Upload image
                </label>
              </div>
              <div className="btn-main">
                <button class="btn btn-primary">Create QSSSA</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
