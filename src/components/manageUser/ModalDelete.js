import { Modal, Button } from "react-bootstrap";

const ModalDelete = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Woohoo, are you sure to delete user: {props.dataModal.email}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.confirmDeleteUser}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalDelete;
