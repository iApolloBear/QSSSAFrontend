import { useContext } from "react";
import { baseUrl } from "../../helpers/fetch";
import { AppContext } from "../../context/AppContext";

export const GroupMembers = ({ group }) => {
  const {
    appState: { userMessages },
  } = useContext(AppContext);

  return (
    <div className="col-md-12 col-lg-12">
      <div className="form-main multi-group">
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
      </div>
    </div>
  );
};
