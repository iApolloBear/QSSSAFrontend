import { useState, useContext, useCallback, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { SocketContext } from "../../context/SocketContext";
import { fetchWithToken } from "../../helpers/fetch";
import { AppContext } from "../../context/AppContext";
import { types } from "../../types/types";

export const CreateGroupModal = ({ show, handleClose, id, onlyRecordings }) => {
  const [groups, setGroups] = useState([]);
  const [option, setOption] = useState("random");
  const [identifier, setIdentifier] = useState("");
  const [customIdentifier, setCustomIdentifier] = useState("");
  const { socket } = useContext(SocketContext);
  const [qsssa, setQSSSA] = useState({});
  const { dispatch } = useContext(AppContext);

  const onChange = ({ target }) => setOption(target.id);

  const getQSSSA = useCallback(async (id) => {
    const fetchQSSSA = await fetchWithToken(`qsssa/${id}`);
    setQSSSA(fetchQSSSA);
  }, []);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  const more = () => setGroups([...groups, `Group ${groups.length}`]);
  const less = () => setGroups(groups.slice(0, -1));
  const options = [
    "Longest hair",
    "Shortest hair",
    "Brightest shirt",
    "Tallest",
    "Shortest",
    "Darkest shoes",
  ];

  const onChangeIdentifier = ({ target }) => {
    setCustomIdentifier("");
    setIdentifier(target.value);
  };

  const onChangeCustomIdentifier = ({ target }) => {
    setIdentifier("");
    setCustomIdentifier(target.value);
  };

  const getGroups = useCallback(
    async (id) => {
      const { groups } = await fetchWithToken(`group/qsssa/${id}`);
      dispatch({ type: types.groupsLoaded, payload: groups });
    },
    [dispatch]
  );

  const onItemChange = (value, index) => {
    const newArr = [...groups];
    newArr[index] = value;
    setGroups(newArr);
  };

  const createGroups = async () => {
    const resp = await fetchWithToken(
      "group",
      {
        code: id,
        groups,
        identifier: identifier.length > 0 ? identifier : customIdentifier,
      },
      "POST"
    );

    socket?.emit("get-groups", id);

    if (resp.ok) {
      handleClose();
      getGroups(id);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div className="model-wrap pb-8">
          <p>How many groups do you want to create? </p>
          <div className="custom-input">
            <input
              type="number"
              placeholder="Enter number"
              className="custom-input__input form-control"
              value={groups.length}
              readOnly
            />
            <button
              type="button"
              className="custom-input__more-button btn-small btn btn-secondary"
              onClick={more}
            >
              &#9650;
            </button>
            <button
              type="button"
              className="custom-input__less-button btn-small btn btn-secondary"
              onClick={less}
            >
              &#9660;
            </button>
          </div>
          {groups.length > 0 &&
            groups.map((item, i) => (
              <input
                key={i}
                className="form-control"
                type="text"
                placeholder={item}
                value={item}
                onChange={(e) => onItemChange(e.target.value, i)}
              />
            ))}
          {qsssa?.qsssa?.type === "RECORDINGS" && (
            <>
              <input className="my-2" type="checkbox" /> Allow students to know
              who is in their group before they record.
              <br />
              <input className="my-2" type="checkbox" /> Allow students to
              rerecord their answers.
              <br />
            </>
          )}
          {qsssa?.qsssa?.type === "IN_PERSON" && (
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="identifiers"
                checked={option === "identifiers"}
                onChange={onChange}
              />
              <label
                style={{ position: "relative", top: "4px" }}
                className="form-check-label"
                htmlFor="flexRadioDefault1"
              >
                Determine who speaks first based on identifiers
              </label>
            </div>
          )}
          {qsssa?.qsssa?.type === "IN_PERSON" &&
            option === "identifiers" &&
            options.map((item, i) => (
              <div key={i} className="mx-4 my-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="option"
                    value={item}
                    onChange={onChangeIdentifier}
                  />
                  <label
                    style={{ position: "relative", top: "4px" }}
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    {item}
                  </label>
                </div>
              </div>
            ))}
          {qsssa?.qsssa?.type === "IN_PERSON" && option === "identifiers" && (
            <input
              className="form-control mx-4 my-3"
              onChange={onChangeCustomIdentifier}
              value={customIdentifier}
              placeholder="Other"
            />
          )}
          {qsssa?.qsssa?.type !== "RECORDINGS" && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="random"
                checked={option === "random"}
                onChange={onChange}
              />
              <label
                style={{ position: "relative", top: "4px" }}
                className="form-check-label"
                htmlFor="flexRadioDefault2"
              >
                Randomly assign group member to speak first
              </label>
            </div>
          )}
          {qsssa?.qsssa?.type === "CHAT" && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="none"
                checked={option === "none"}
                onChange={onChange}
              />
              <label
                style={{ position: "relative", top: "4px" }}
                className="form-check-label"
                htmlFor="flexRadioDefault2"
              >
                Don't Assign
              </label>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center button-sm border-0">
        <button onClick={createGroups} className="btn btn-primary">
          Create groups
        </button>
      </Modal.Footer>
    </Modal>
  );
};
