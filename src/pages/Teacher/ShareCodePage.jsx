import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWithoutToken } from "../../helpers/fetch";
import { ShareLinkModal } from "../../components/Teacher/ShareLinkModal";
import { Link } from "react-router-dom";

export const ShareCodePage = () => {
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
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="form-main text-center">
              {qsssa.qsssa ? (
                <>
                  <h1>Ready for share topic and question with students</h1>
                  <div className="form-wrap text-start questions-custom">
                    <h4>Topic: {qsssa.qsssa?.topic}</h4>
                    <h6 className="mb-1">{qsssa.qsssa?.question}</h6>
                    <p>{qsssa.qsssa?.sentenceStem}</p>
                  </div>
                  <div>
                    <div className="tag">{id.slice(0, 6)}</div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleShow}
                    >
                      Share link
                    </button>
                    <Link
                      to={`/studentlist/${id}`}
                      type="button"
                      className="btn btn-primary"
                    >
                      Create groups
                    </Link>
                  </div>
                  <ShareLinkModal
                    show={show}
                    handleClose={handleClose}
                    id={id}
                  />
                </>
              ) : (
                <h1>
                  Error {qsssa.status} {qsssa.msg}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
