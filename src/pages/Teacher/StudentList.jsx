import { useEffect, useCallback, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchWithToken } from "../../helpers/fetch";
import { CreateGroupModal } from "../../components/Teacher/CreateGroupModal";
import { StudentsContext } from "../../context/students/StudentsContext";
import { types } from "../../types/types";
import { SocketContext } from "../../context/SocketContext";

export const StudentListPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});
  const [show, setShow] = useState(false);
  const {
    studentsState: { students },
    dispatch,
  } = useContext(StudentsContext);
  const { socket } = useContext(SocketContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getQSSSA = useCallback(async (id) => {
    const { qsssa } = await fetchWithToken(`qsssa/${id}`);
    setQSSSA(qsssa);
  }, []);

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
  }, [joinRoom, id]);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  useEffect(() => {
    getStudents(id);
  }, [getStudents, id]);

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
                <button
                  onClick={handleShow}
                  type="button"
                  className="btn btn-secondary"
                >
                  Click to create group
                </button>
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
      </div>
    </main>
  );
};
