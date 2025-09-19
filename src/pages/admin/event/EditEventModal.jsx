import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditEventModal = ({ event, handleEdit, show, setShow }) => {
    const [nama, setNama] = useState(event.nama);
    const [email, setEmail] = useState(event.email);

    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
        handleEdit({ nama, email });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Event</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control type="text" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Batal
                    </Button>
                    <Button variant="primary" type="submit">
                        Simpan
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditEventModal;
