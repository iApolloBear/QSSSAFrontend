import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWithoutToken } from "../../helpers/fetch";
import { CreateGroupModal } from "../../components/Teacher/CreateGroupModal";

export const StudentListPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getQSSSA = useCallback(async (id) => {
    const fetchQSSSA = await fetchWithoutToken(`qsssa/${id}`);
    setQSSSA(fetchQSSSA);
  }, []);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  return (
    <main>
      <div className="container">
        <div className="d-flex justify-content-between top-title-main">
          <p></p>
          <p>Topic: {qsssa.qsssa?.topic}</p>
        </div>
        <div className="justify-content-center row">
          <div className="col-lg-7">
            <div className="form-main">
              <div className="form-wrap">
                <div className="inner-box">
                  <ul>
                    <li>Student Name</li>
                    {qsssa.qsssa?.users.map((user) => (
                      <li>{user.name}</li>
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
                <CreateGroupModal id={id} show={show} handleClose={handleClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
