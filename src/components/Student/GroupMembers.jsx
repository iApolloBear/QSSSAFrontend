import { useState, useEffect, useCallback } from "react";
import { baseUrl, fetchWithToken } from "../../helpers/fetch";

export const GroupMembers = ({ group }) => {
  const [users, setUsers] = useState([]);

  const getMembers = useCallback(async () => {
    const { users } = await fetchWithToken(`message/members/${group.id}`);
    setUsers(users);
  }, []);

  useEffect(() => {
    getMembers();
  }, [getMembers]);

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
                  ? users.map(({ user }) => (
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
                  : group.UsersOnGroups?.map(({ user }) => (
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
