import { baseUrl } from "../../helpers/fetch";

export const GroupMembers = ({ group, messages }) => {
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
                  ? Array.from(
                      new Set(messages?.map((message) => message.user._id))
                    )
                      .map((id) => {
                        return {
                          id: id,
                          name: messages.find(
                            (message) => message.user._id === id
                          ).user.name,
                        };
                      })
                      .map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>
                            {user.answers?.length > 0 ? (
                              user.answers?.map((answer) => (
                                <audio
                                  key={answer._id}
                                  src={`${baseUrl}/upload/answers/${answer._id}`}
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
                  : group.users?.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>
                          {user.answers?.length > 0 ? (
                            user.answers?.map((answer) => (
                              <audio
                                key={answer._id}
                                src={`${baseUrl}/upload/answers/${answer._id}`}
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
