import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useEvent from "../../../../hooks/useEvent";

const AddModal = ({ handleAdd, show, setShow }) => {
    const { events } = useEvent();
    // input
    const [jumlahUangMasuk, setJumlahUangMasuk] = useState("");
    const [asalPemasukan, setAsalPemasukan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [bukti, setBukti] = useState(null);
    const [idKeuangan, setIdKeuangan] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("jumlah_uang_masuk", jumlahUangMasuk);
        data.append("asal_pemasukan", asalPemasukan);
        data.append("tanggal_pemasukan", tanggal);
        data.append("bukti_pemasukan", bukti);
        data.append("keuangan_id", idKeuangan);

        handleAdd(data);
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
                        <Form.Control type="number" min="1" value={jumlahUangMasuk} onChange={(e) => setJumlahUangMasuk(e.target.value)} required />
                    </Form.Group>

                    {/* Jenis */}
                    <Form.Group className="mb-3">
                        <Form.Label>Asal Pemasukan</Form.Label>
                        <Form.Control type="text" value={asalPemasukan} onChange={(e) => setAsalPemasukan(e.target.value)} required />
                    </Form.Group>

                    {/* Tanggal */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tanggal</Form.Label>
                        <Form.Control type="date" onChange={(e) => setTanggal(e.target.value)} required />
                    </Form.Group>

                    {/* Bukti */}
                    <Form.Group className="mb-3">
                        <Form.Label>Bukti</Form.Label>
                        <Form.Control type="file" onChange={(e) => setBukti(e.target.files[0])} required />
                    </Form.Group>

                    {/* Event */}
                    <Form.Group className="mb-3">
                        <Form.Label>Event</Form.Label>
                        <Form.Select name="event_id" value={idKeuangan} onChange={(e) => setIdKeuangan(e.target.value)}>
                            <option value="">Pilih Event</option>
                            {events.map((event) => (
                                <option value={event.id} key={event.id}>
                                    {event.nama_event}
                                </option>
                            ))}
                        </Form.Select>
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
