import { useEffect, useCallback, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, fetchWithToken } from "../../helpers/fetch";
import { QSSSAContext } from "../../context/qsssa/QSSSAContext";
import { types } from "../../types/types";
import { SocketContext } from "../../context/SocketContext";

export const GroupPage = () => {
  const { id } = useParams();
  const { socket } = useContext(SocketContext);
  const {
    qsssaState: { qsssa },
    dispatch,
  } = useContext(QSSSAContext);
  const [groups, setGroups] = useState([]);

  const getQSSSA = useCallback(
    async (id) => {
      const fetchQSSSA = await fetchWithToken(`qsssa/${id}`);
      dispatch({ type: types.qsssaLoaded, payload: fetchQSSSA.qsssa });
    },
    [dispatch]
  );

  const joinRoom = useCallback(
    (id) => {
      socket?.emit("join", id);
    },
    [socket]
  );

  const getGroups = useCallback(async (id) => {
    const { groups } = await fetchWithToken(`group/${id}`);
    setGroups(groups);
  }, []);

  useEffect(() => {
    joinRoom(id);
    return () => socket?.emit("leave", id);
  }, [joinRoom, id, socket]);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  useEffect(() => {
    getGroups(id);
  }, [getGroups, id]);

  return (
    <main>
      <div className="grp-main">
        <div className="container">
          <div className="d-flex justify-content-between top-title-main">
            <p>{id}</p>
            <p>Topic: {qsssa?.topic}</p>
          </div>
          <div className="row">
            {groups?.map((group) => (
              <div key={group.id} className="col-md-6 col-lg-6">
                <div className="form-main multi-group">
                  <div
                    style={{ background: group.color }}
                    className="form-wrap"
                  >
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
                          {group.UsersOnGroups.map(({ user }) => (
                            <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>
                                {user.Answer.length > 0 ? (
                                  user.Answer.map((answer) => (
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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
