import { useCallback, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MessagesContext } from "../../context/messages/MessagesContext";
import { GroupsContext } from "../../context/groups/GroupsContext";
import { fetchWithToken } from "../../helpers/fetch";
import { types } from "../../types/types";

export const QSSSAListPage = () => {
  const [qsssas, setQSSSAS] = useState([]);
  const history = useHistory();
  const getQSSSAS = useCallback(async () => {
    const { qsssas } = await fetchWithToken("qsssa/students/qsssas");
    setQSSSAS(qsssas);
  }, []);
  const { dispatch } = useContext(MessagesContext);
  const { dispatch: groupsDispatch } = useContext(GroupsContext);

  const go = (code) => {
    dispatch({
      type: types.messagesLoaded,
      payload: [],
    });
    groupsDispatch({
      type: types.groupsLoaded,
      dispatch: {},
    });
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
                    </tr>
                  </thead>
                  <tbody>
                    {qsssas.map((qsssa) => (
                      <tr
                        onDoubleClick={() => go(qsssa.accessCode)}
                        style={{ cursor: "pointer" }}
                        key={qsssa._id}
                      >
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
    </main>
  );
};
