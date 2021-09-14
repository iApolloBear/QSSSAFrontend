export const CodeJoinForm = ({ qsssa: { topic } }) => {
  return (
    <div className="bottom-show">
      <div className="first">
        <h5>Prof.Charles</h5>
        <p>Shared a Question to you join from below.</p>
        <h5>Topic: {topic}</h5>
      </div>
      <div className="form-main p-0">
        <div className="form-wrap">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your name"
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
