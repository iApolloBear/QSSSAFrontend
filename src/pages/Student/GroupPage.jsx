import { useEffect, useCallback, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { fetchWithoutToken } from "../../helpers/fetch";
import useRecorder from "../../hooks/useRecorder";

export const GroupPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});
  const { name } = useContext(UserContext);
  const [users, setUsers] = useState(false);
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  const getQSSSA = useCallback(async (id) => {
    const fetchQSSSA = await fetchWithoutToken(`qsssa/${id}`);
    setQSSSA(fetchQSSSA);
  }, []);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  return (
    <main>
      <div className="grp-main">
        <div className="container">
          <div className="d-flex justify-content-between top-title-main">
            <p>{qsssa.qsssa?.accessCode}</p>
            <p>{qsssa.qsssa?.topic}</p>
          </div>
          <div className="justify-content-center row">
            <div className="col-lg-12">
              <div className="justify-content-center row">
                <div className="col-lg-6">
                  <div className="questions-custom">
                    <p>While you are waiting think about this question: </p>
                    <h6>Question: {qsssa.qsssa?.question}</h6>
                    <audio src={audioURL} controls />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="form-main multi-group">
                <div className="form-wrap">
                  <h2 className="h5">&nbsp;</h2>
                  <div className="inner-box">
                    <table className="mb-5">
                      <tbody>
                        {users &&
                          qsssa.qsssa?.users &&
                          qsssa.qsssa.users
                            .filter((user) => user.name !== name)
                            .map((user) => (
                              <tr>
                                <td>{user.name}</td>
                                <td></td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                    <table>
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Record Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{name}</td>
                          <td>
                            {isRecording ? (
                              <button
                                onClick={stopRecording}
                                className="btn btn-sm btn-primary"
                              >
                                <span>
                                  <i className="fas fa-microphone" />
                                  Stop
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={startRecording}
                                className="btn btn-sm btn-primary"
                              >
                                <span>
                                  <i className="fas fa-microphone" />
                                  Record
                                </span>
                              </button>
                            )}
                            {audioURL && (
                              <button className="btn btn-sm btn-primary mt-2">
                                Submit
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => setUsers(true)}
                              className="btn btn-small btn-primary"
                            >
                              Ready to answer
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
