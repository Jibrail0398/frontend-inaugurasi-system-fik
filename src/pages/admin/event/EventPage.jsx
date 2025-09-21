import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DetailEventModal from "./DetailEventModal";
import useEvent from "../../../hooks/useEvent";
import TableSearch from "../../../components/TableSearch";
import { event } from "jquery";
import { formatDateID } from "../../../helpers/dateHelper";
import CardInfo from "../../../components/CardInfo";

const TableEvents = ({ events, setEvents, handleDelete, handleEdit, handleDetail }) => {
    return (
        <>
            <AddEventModal handleAdd={(event) => setEvents([...events, event])} />
            <TableSearch
                data={events}
                defaultOrder={{ column: 0, order: "desc" }}
                className="mt-4"
                header={["ID", "Nama Event", "Jenis", "Tema", "Tempat", "Status Pendaftaran Panitia", "Status Pendaftaran Peserta", "Created At", "Aksi"].map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
                body={events.map((event, index) => (
                    <tr key={index}>
                        <td>{event.id}</td>
                        <td>{event.nama_event}</td>
                        <td>{event.jenis}</td>
                        <td>{event.tema}</td>
                        <td>{event.tempat}</td>
                        <td>{event.status_pendaftaran_panitia}</td>
                        <td>{event.status_pendaftaran_peserta}</td>
                        <td>{formatDateID(event.created_at)}</td>
                        <td>
                            <div className="d-flex gap-2">
                                <button className="btn btn-danger btn-circle btn-sm" onClick={() => handleDelete("Event 1")}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button className="btn btn-primary btn-circle btn-sm" onClick={() => handleEdit("Event 1")}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <a href="#" className="btn btn-info btn-circle btn-sm" onClick={() => handleDetail("Event 1")}>
                                    <i className="fas fa-info-circle"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                ))}
            />
        </>
    );
};

const EventPage = () => {
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const intervalRef = null;
    const [loading, setLoading] = useState(true);

    // Data
    const { getAll } = useEvent();
    const [events, setEvents] = useState([]);

    const handleDelete = async (id) => {
        const response = await Swal.fire({
            title: "Delete Event",
            text: "Apakah anda yakin ingin menghapus event ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            cancelButtonText: "Batal",
        });

        const shouldDelete = response.isConfirmed;

        if (!shouldDelete) return;
    };

    const handleEdit = (id) => {
        setShowEditModal(!showEditModal);
    };

    const handleDetail = (id) => {
        setShowDetailModal(!showDetailModal);
    };

    const fetchData = async () => {
        try {
            let eventResponse = await getAll();
            setEvents(eventResponse);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Event</h1>
            </div>
            <div className="row">
                {/* Total Event */}
                <CardInfo type="primary" title="Total Event" value={events.length} icon="fa-list" />
                <CardInfo type="success" title="Pendaftaran Panitia Buka" value={events.filter((event) => event.status_pendaftaran_panitia === "buka").length} icon="fa-list" />
                <CardInfo type="info" title="Pendaftaran Peserta Buka" value={events.filter((event) => event.status_pendaftaran_peserta === "buka").length} icon="fa-list" />
                {/* Tutup */}
                <CardInfo type="warning" title="Pendaftaran Panitia Tutup" value={events.filter((event) => event.status_pendaftaran_panitia === "tutup").length} icon="fa-list" />
                <CardInfo type="danger" title="Pendaftaran Peserta Tutup" value={events.filter((event) => event.status_pendaftaran_peserta === "tutup").length} icon="fa-list" />
            </div>

            <div className="card shadow mb-4 p-3">
                {loading && <div>Loading...</div>}
                {!loading && <TableEvents events={events} setEvents={setEvents} handleDelete={handleDelete} handleEdit={handleEdit} handleDetail={handleDetail} />}
            </div>
        </>
    );
};

export default EventPage;
