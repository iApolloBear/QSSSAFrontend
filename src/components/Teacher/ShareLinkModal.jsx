import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

export const ShareLinkModal = ({ show, handleClose, id }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Link
          to={`/student?code=${id}`}
          target="_blank"
        >{`${window.location.protocol}/${window.location.host}/student?code=${id}`}</Link>
      </Modal.Body>
      <Modal.Footer>
        <Link
          to={`/student?code=${id}`}
          target="_blank"
          className="btn btn-small btn-secondary"
        >
          OK
        </Link>
      </Modal.Footer>
    </Modal>
  );
};
