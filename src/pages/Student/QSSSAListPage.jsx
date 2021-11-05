import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchWithToken } from "../../helpers/fetch";
import { formatDate } from "../../helpers/formatDate";

export const QSSSAListPage = () => {
  const [qsssas, setQSSSAS] = useState([]);
  const history = useHistory();
  const getQSSSAS = useCallback(async () => {
    const { qsssas } = await fetchWithToken("qsssa");
    setQSSSAS(qsssas);
  }, []);

  const go = (code) => {
    history.push(`group/${code}`);
  };

  useEffect(() => {
    getQSSSAS();
  }, [getQSSSAS]);

  return (
    <main>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">My QSSSA'S</h4>
                <table className="table-hover">
                  <thead>
                    <tr>
                      <th>Topic</th>
                      <th>Question</th>
                      <th>Sentence Stem</th>
                      <th>Access Code</th>
                      <th>Join Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qsssas.map((qsssa) => (
                      <tr key={qsssa.id}>
                        <td>{qsssa.topic}</td>
                        <td>{qsssa.question}</td>
                        {qsssa.sentenceStem ? (
                          <td>{qsssa.sentenceStem}</td>
                        ) : (
                          <td>None</td>
                        )}
                        <td>{qsssa.accessCode}</td>
                        <td>{formatDate(qsssa.UsersOnQSSSAS[0].createdAt)}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-small"
                            onClick={() => go(qsssa.accessCode)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
