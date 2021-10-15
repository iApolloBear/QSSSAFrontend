import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Picker from "emoji-picker-react";

export const GuestForm = () => {
  const { register: userRegister } = useContext(AuthContext);
  const [emoji, setEmoji] = useState(false);
  const [name, setName] = useState("");

  const onChange = ({ target }) => setName(target.value);
  const onEmojiClick = (e, { emoji }) => setName(`${name}${emoji}`);

  const onSubmit = async (e) => {
    e.preventDefault();
    userRegister(name);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group mb-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="form-control mb-0"
          name="name"
          value={name}
          onChange={onChange}
        />
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

      <div className="form-button">
        <button type="submit" className="btn btn-primary btn-sm">
          Join
        </button>
      </div>
    </form>
  );
};
