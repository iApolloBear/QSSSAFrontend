import { useEffect, useCallback, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";
import { fetchWithoutToken } from "../../helpers/fetch";
import { CreateGroupModal } from "../../components/Teacher/CreateGroupModal";
import { StudentsContext } from "../../context/students/StudentsContext";

export const StudentListPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});
  const [show, setShow] = useState(false);
  const { connectSocket } = useSocket("http://localhost:4000");
  const {
    studentsState: { students },
  } = useContext(StudentsContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getQSSSA = useCallback(async (id) => {
    const fetchQSSSA = await fetchWithoutToken(`qsssa/${id}`);
    setQSSSA(fetchQSSSA);
  }, []);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  useEffect(() => {
    connectSocket(id);
  }, [connectSocket, id]);

  return (
    <main>
      <div className="container">
        <div className="d-flex justify-content-between top-title-main">
          <p>{qsssa.qsssa?.question}</p>
          <p>Topic: {qsssa.qsssa?.topic}</p>
        </div>
        <div className="justify-content-center row">
          <div className="col-lg-7">
            <div className="form-main">
              <div className="form-wrap">
                <div className="inner-box">
                  <ul>
                    <li>Student Name</li>
                    {students?.map((user) => (
                      <li key={user._id}>
                        {user.ready && <i className="fas fa-check"></i>} {user.name}
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
