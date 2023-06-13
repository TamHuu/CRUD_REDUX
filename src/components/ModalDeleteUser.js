import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deteleUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalDeleteUser(props) {
  const { show, handleClose, dataUserDelete, handleDeleteFromModal } = props;
  const ConfirmDelete = async () => {
    let res = await deteleUser(dataUserDelete);

    if (res && +res.statusCode === 204) {
      handleClose();
      toast.success("Delete a user succed !");
      handleDeleteFromModal(dataUserDelete);
    } else {
      toast.error("Error delete a user");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone ! Do you want to delete this user ?
            <br />
            <b>email= {dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
