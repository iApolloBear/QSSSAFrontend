import { useContext, useState } from "react";
import { baseUrl, fetchWithToken } from "../../helpers/fetch";
import { AppContext } from "../../context/AppContext";
import { SocketContext } from "../../context/SocketContext";

export const GroupMember = ({ user }) => {
  const { socket } = useContext(SocketContext);
  const {
    appState: { group },
  } = useContext(AppContext);
  const [comment, setComment] = useState("");

  const onChange = ({ target }) => setComment(target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetchWithToken(
      "comment",
      { answerId: user.Answer[0].id, text: comment },
      "POST"
    );
    socket?.emit("get-user-messages", group.id);
    setComment("");
  };

  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="card-title">{user.name}</div>
        <div className="card-text">
          {user.Answer.length > 0 ? (
            <audio
              src={`${baseUrl}/upload/answers/${user.Answer[0].id}`}
              controls
            ></audio>
          ) : (
            <>
              <i className="far fa-play-circle"></i> Pending
            </>
          )}
        </div>
      </div>
      {user.Answer.length > 0 && (
        <ul className="list-group list-group-flush">
          {user.Answer[0].Comment.map((comment) => (
            <li className="list-group-item" key={comment.id}>
              <p className="text-muted">{comment.user.name} says:</p>
              {comment.text}
            </li>
          ))}
          <li className="list-group-item">
            <form onSubmit={onSubmit}>
              <textarea
                className="form-control"
                placeholder="Type a comment"
                rows={4}
                value={comment}
                onChange={onChange}
                style={{ height: "auto" }}
              ></textarea>
              <button type="submit" className="btn-small btn btn-primary">
                <i className="fa fa-paper-plane"></i>
              </button>
            </form>
          </li>
        </ul>
      )}
    </div>
  );
};
