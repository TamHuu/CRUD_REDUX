import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";
function ModalAddNew(props) {
  const { show, handleClose, handleUpdate } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);

    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Create new user successed !");
      handleUpdate({ first_name: name, id: res.id });
    } else {
      toast.error("Create new user error !");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
