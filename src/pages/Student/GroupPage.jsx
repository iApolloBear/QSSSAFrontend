import { useEffect, useCallback, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { fetchWithoutToken } from "../../helpers/fetch";

export const GroupPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});
  const { name } = useContext(UserContext);

  const getQSSSA = useCallback(async (id) => {
    const fetchQSSSA = await fetchWithoutToken(`qsssa/${id}`);
    console.log(fetchQSSSA);
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="form-main multi-group">
                <div className="form-wrap">
                  <h2 className="h5">&nbsp;</h2>
                  <div className="inner-box">
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
                            <button>
                              <span>
                                <i className="fas fa-microphone" />
                                Record
                              </span>
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-small btn-primary">
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
