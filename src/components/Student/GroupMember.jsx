import { useContext, useState } from "react";
import { baseUrl, fetchWithToken } from "../../helpers/fetch";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";

export const GroupMember = ({ user }) => {
  const { socket } = useContext(SocketContext);
  const {
    appState: { group, qsssa },
  } = useContext(AppContext);
  const {
    auth: { uid },
  } = useContext(AuthContext);
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
    socket?.emit("reload-group", group.id);
    setComment("");
  };

  const like = async () => {
    await fetchWithToken(
      "like",
      {
        answerId: user.Answer[0].id,
      },
      "POST"
    );
    socket?.emit("get-user-messages", group.id);
    socket?.emit("reload-group", group.id);
  };

  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="card-title d-flex align-items-center justify-content-between">
          {user.name}
          {user.Answer.length > 0 ? (
            <button onClick={like} className="btn btn-primary btn-small">
              {user.Answer[0].Like.some((like) => like.userId === uid) ? (
                <i className="fas fa-thumbs-up"></i>
              ) : (
                <i className="far fa-thumbs-up"></i>
              )}
              {` ${user.Answer[0].Like.length}`}
            </button>
          ) : (
            <></>
          )}
        </div>
        {qsssa.type !== "CHAT" && (
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
        )}
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
