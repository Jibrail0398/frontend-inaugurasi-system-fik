import { Button, Modal } from "react-bootstrap";

const BuktiModal = ({ uangMasuk, show, setShow }) => {
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Body>
                <img src="https://placehold.co/600x400" style={{ width: "100%", height: "auto" }} alt="bukti" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Batal
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BuktiModal;
