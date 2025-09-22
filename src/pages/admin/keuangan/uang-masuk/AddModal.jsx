import { Button, Form, Modal } from "react-bootstrap";

const AddModal = ({ handleAdd, show, setShow }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        handleAdd({
            jumlah_uang_masuk: data.get("jumlah_uang_masuk"),
            asal_pemasukan: data.get("asal_pemasukan"),
            tema: data.get("tema"),
            bukti: data.get("bukti"),
        });

        setShow(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Uang Masuk</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {/* Nama Event */}
                    <Form.Group className="mb-3">
                        <Form.Label>Nominal</Form.Label>
                        <Form.Control type="text" name="jumlah_uang_masuk" required />
                    </Form.Group>

                    {/* Jenis */}
                    <Form.Group className="mb-3">
                        <Form.Label>Asal Pemasukan</Form.Label>
                        <Form.Control type="text" name="asal_pemasukan" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tanggal</Form.Label>
                        <Form.Control type="date" name="tema" required />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
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

export default AddModal;
