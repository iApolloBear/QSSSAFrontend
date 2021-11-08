import { useCallback, useEffect, useState } from "react";
import { fetchWithToken } from "../../helpers/fetch";

export const QSSSAS = () => {
  const [qsssas, setQSSSAS] = useState([]);
  const getQSSSAS = useCallback(async () => {
    const { qsssas } = await fetchWithToken("qsssa");
    setQSSSAS(qsssas);
  }, []);

  useEffect(() => {
    getQSSSAS();
  }, [getQSSSAS]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">QSSSAS</h4>
              <table className="table-hover">
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Question</th>
                    <th>Sentence Stem</th>
                    <th>Access Code</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
