import { Button, Form, Modal } from "react-bootstrap";

const DetailEventModal = ({ event, show, setShow }) => {
    return (
        <Modal show={show} onHide={setShow}>
            <Modal.Header closeButton>
                <Modal.Title>Detail Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control type="text" value={event.nama} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={event.email} disabled />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailEventModal;
