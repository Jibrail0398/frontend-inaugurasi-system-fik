import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function TestPage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log("Nama:", data.get("nama"));
        console.log("Email:", data.get("email"));
        handleClose();
    };

    return (
        <div className="p-3">
            <Button variant="primary" onClick={handleShow}>
                Buka Form
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Pendaftaran</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" name="nama" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" required />
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
        </div>
    );
}

export default TestPage;
