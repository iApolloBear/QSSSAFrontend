import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWithoutToken } from "../../helpers/fetch";

export const GroupPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});

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
            <p>{id}</p>
            <p>Topic: {qsssa.qsssa?.topic}</p>
          </div>
          <div className="row">
            {qsssa.qsssa?.groups.map((group) => (
              <div key={group._id} className="col-md-6 col-lg-6">
                <div className="form-main multi-group">
                  <div className="form-wrap">
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
                                <i className="far fa-play-circle"></i>Pending
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
