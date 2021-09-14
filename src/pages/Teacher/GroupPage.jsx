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
      <div className="container">
        <div className="d-flex justify-content-between top-title-main">
          <p></p>
          <p>Topic: {qsssa.qsssa?.topic}</p>
        </div>
        <div className="justify-content-center row">
          <div className="col-lg-7">
            <div className="form-main">
              <div className="form-wrap">
                <div className="inner-box"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
