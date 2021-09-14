import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Picker from "emoji-picker-react";
import { fetchWithoutToken } from "../../helpers/fetch";
import { useHistory } from "react-router-dom";

export const CodeJoinForm = ({ qsssa: { topic, accessCode } }) => {
  const [emoji, setEmoji] = useState(false);
  const { name, setName } = useContext(UserContext);
  const history = useHistory();

  const onChange = ({ target }) => setName(target.value);
  const onEmojiClick = (e, { emoji }) => setName(`${name}${emoji}`);

  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetchWithoutToken(
      "students",
      { name, qsssaId: accessCode },
      "POST"
    );
    if (resp.ok) {
      history.push(`/student/grouppage/${accessCode}`);
    }
  };

  return (
    <div className="bottom-show">
      <div className="first">
        <h5>Prof.Charles</h5>
        <p>Shared a Question to you join from below.</p>
        <h5>Topic: {topic}</h5>
      </div>
      <div className="form-main p-0">
        <form onSubmit={onSubmit}>
          <div className="form-wrap">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control mb-0"
                name="name"
                value={name}
                onChange={onChange}
              />
              <div className="input group-append">
                <button
                  type="button"
                  className="code-button btn-small btn btn-primary"
                  onClick={() => setEmoji(!emoji)}
                >
                  {!emoji ? "\uD83D\uDE00" : "\u2715"}
                </button>
                <Picker
                  pickerStyle={{
                    position: "absolute",
                    right: "0",
                    bottom: "100%",
                    zIndex: "9",
                    display: emoji ? "flex" : "none",
                  }}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button type="submit" className="btn btn-primary">
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
