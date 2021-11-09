import { useEffect, useCallback, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchWithToken, baseUrl } from "../../helpers/fetch";
import { CreateGroupModal } from "../../components/Teacher/CreateGroupModal";
import { types } from "../../types/types";
import { SocketContext } from "../../context/SocketContext";
import { AppContext } from "../../context/AppContext";

export const StudentListPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});
  const [show, setShow] = useState(false);
  const {
    appState: { students, groups },
    dispatch,
  } = useContext(AppContext);
  const { socket } = useContext(SocketContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getQSSSA = useCallback(async (id) => {
    const { qsssa } = await fetchWithToken(`qsssa/${id}`);
    setQSSSA(qsssa);
  }, []);

  const getGroups = useCallback(
    async (id) => {
      const { groups } = await fetchWithToken(`group/${id}`);
      dispatch({ type: types.groupsLoaded, payload: groups });
    },
    [dispatch]
  );

  const joinRoom = useCallback(
    (id) => {
      socket?.emit("join", id);
    },
    [socket]
  );

  const getStudents = useCallback(
    async (id) => {
      const { students } = await fetchWithToken(`teacher/qsssa/students/${id}`);
      dispatch({ type: types.studentsLoaded, payload: students });
    },
    [dispatch]
  );

  useEffect(() => {
    joinRoom(id);
    return () => socket?.emit("leave", id);
  }, [joinRoom, id, socket]);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  useEffect(() => {
    getStudents(id);
  }, [getStudents, id]);

  useEffect(() => {
    getGroups(id);
  }, [getGroups, id]);

  return (
    <main>
      <div className="container">
        <div className="d-flex justify-content-between top-title-main">
          <p>{qsssa?.question}</p>
          <p>Topic: {qsssa?.topic}</p>
        </div>
        <div className="justify-content-center row">
          <div className="col-lg-7">
            <div className="form-main">
              <div className="form-wrap">
                <div className="inner-box">
                  <ul>
                    <li>Student Name</li>
                    {students?.map(({ user }) => (
                      <li key={user.id}>
                        {user.ready && <i className="fas fa-check"></i>}
                        {user.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-center mt-4">
                {qsssa?.UserGroup?.length === 0 && (
                  <button
                    onClick={handleShow}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Click to create group
                  </button>
                )}
                <CreateGroupModal
                  onlyRecording={qsssa.qsssa?.onlyRecording}
                  id={id}
                  show={show}
                  handleClose={handleClose}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {groups?.map((group) => (
            <div key={group.id} className="col-md-6 col-lg-6">
              <div className="form-main multi-group">
                <div style={{ background: group.color }} className="form-wrap">
                  <Link className="h5">{group.name}</Link>
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
    </main>
  );
};
