import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

import { toast } from "react-toastify";
import { putUpdateUser } from "../services/UserService";
function ModalEditUser(props) {
  const { show, handleClose, dataUserEdit, handleEditFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);

    if (res && res.updateAt) {
      handleEditFromModal({ first_name: name, id: dataUserEdit.id });
      handleClose();
      toast.success("update succed");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
