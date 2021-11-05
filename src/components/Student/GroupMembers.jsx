import { useContext } from "react";
import { baseUrl, fetchWithToken } from "../../helpers/fetch";
import { AppContext } from "../../context/AppContext";
import { SocketContext } from "../../context/SocketContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  text: yup.string().required(),
});

export const GroupMembers = () => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    appState: { userMessages, group },
  } = useContext(AppContext);

  const { socket } = useContext(SocketContext);

  const onSubmit = async (data, id) => {
    const { text } = data;
    await fetchWithToken("comment", { answerId: id, text: text }, "POST");
    socket?.emit("get-user-messages", group.id);
    reset();
  };

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        {userMessages.map(({ user }) => (
          <div key={user.id} className="card my-3">
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
                  <form
                    onSubmit={handleSubmit((data) =>
                      onSubmit(data, user.Answer[0].id)
                    )}
                  >
                    <textarea
                      className="form-control"
                      placeholder="Type a comment"
                      {...register("text")}
                      rows={4}
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
        ))}
        {/*<div className="form-main multi-group">
        <div style={{ background: group?.color }} className="form-wrap">
          <h2 className="h5">{group.name}</h2>
          <div className="inner-box">
            <table>
              <thead>
                <tr>
                  <th>Student Name:</th>
                  <th>Record Status</th>
                </tr>
              </thead>
              <tbody>
                {group.selected
                  ? userMessages.map(({ user }) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>
                          {user.Answer?.length > 0 ? (
                            user.Answer?.map((answer) => (
                              <audio
                                key={answer.id}
                                src={`${baseUrl}/upload/answers/${answer.id}`}
                                controls
                              ></audio>
                            ))
                          ) : (
                            <>
                              <i className="far fa-play-circle"></i>
                              Pending
                            </>
                          )}
                        </td>
                        <td>
                          <i className="fas fa-comment"></i>
                        </td>
                      </tr>
                    ))
                    : userMessages.map(({ user }) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>
                          {user.Answer?.length > 0 ? (
                            user.Answer?.map((answer) => (
                              <audio
                                key={answer.id}
                                src={`${baseUrl}/upload/answers/${answer.id}`}
                                controls
                              ></audio>
                            ))
                          ) : (
                            <>
                              <i className="far fa-play-circle"></i>
                              Pending
                            </>
                          )}
                        </td>
                        <td>
                          <i
                            style={{ cursor: "pointer" }}
                            className="fas fa-comment"
                          ></i>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>*/}
      </div>
    </div>
  );
};
