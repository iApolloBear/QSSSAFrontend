import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CreateGroupModal = ({ show, handleClose, id }) => {
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
              value={0}
            />
            <button
              type="button"
              className="custom-input__more-button btn-small btn btn-secondary"
            >
              &#9650;
            </button>
            <button
              type="button"
              className="custom-input__less-button btn-small btn btn-secondary"
            >
              &#9660;
            </button>
          </div>
          <input type="checkbox" /> Allow students to know who is in their group
          before they record.
          <br />
          <input type="checkbox" /> Allow students to rerecord their answers.
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center button-sm border-0">
        <Link to={`/teacher/grouppage/${id}`} className="btn btn-primary">
          Create groups
        </Link>
      </Modal.Footer>
    </Modal>
  );
};
