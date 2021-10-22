import { useEffect, useCallback, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../../context/RoomContext";
import { fetchWithoutToken, baseUrl } from "../../helpers/fetch";
import { QSSSAContext } from "../../context/qsssa/QSSSAContext";
import { types } from "../../types/types";

export const GroupPage = () => {
  const { id } = useParams();
  const { join } = useContext(RoomContext);
  const {
    qsssaState: { qsssa },
    dispatch,
  } = useContext(QSSSAContext);

  const getQSSSA = useCallback(
    async (id) => {
      const fetchQSSSA = await fetchWithoutToken(`qsssa/${id}`);
      join(id);
      dispatch({ type: types.qsssaLoaded, payload: fetchQSSSA.qsssa });
    },
    [join]
  );

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  return (
    <main>
      <div className="grp-main">
        <div className="container">
          <div className="d-flex justify-content-between top-title-main">
            <p>{id}</p>
            <p>Topic: {qsssa?.topic}</p>
          </div>
          <div className="row">
            {qsssa?.groups?.map((group) => (
              <div key={group._id} className="col-md-6 col-lg-6">
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
                          {group.users.map((user) => (
                            <tr key={user._id}>
                              <td>{user.name}</td>
                              <td>
                                {user.answers.length > 0 ? (
                                  user.answers.map((answer) => (
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
