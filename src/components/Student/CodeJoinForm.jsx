import { useState } from "react";
import Picker from "emoji-picker-react";

export const CodeJoinForm = ({ qsssa: { topic } }) => {
  const [emoji, setEmoji] = useState(false);
  const [name, setName] = useState("");

  const onChange = ({ target }) => setName(target.value);
  const onEmojiClick = (e, { emoji }) => setName(`${name}${emoji}`);

  return (
    <div className="bottom-show">
      <div className="first">
        <h5>Prof.Charles</h5>
        <p>Shared a Question to you join from below.</p>
        <h5>Topic: {topic}</h5>
      </div>
      <div className="form-main p-0">
        <form>
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
