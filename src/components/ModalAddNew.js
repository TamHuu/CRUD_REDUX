import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
function ModalAddNew(props) {
  const { show, handleClose } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleSaveChange = (e) => {
    console.log(">>>>check name , job", name, job);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label htmlFor="job">Job</Form.Label>
          <Form.Control
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
