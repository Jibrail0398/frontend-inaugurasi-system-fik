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
        // console.log(showEditModal);
        setShowEditModal(!showEditModal);
    };

    const handleDetail = (id) => {
        setShowDetailModal(!showDetailModal);
    };

    const fetchData = async () => {
        try {
            let eventResponse = await getAll();

            let eventModified = eventResponse.map((event) => {
                // Konversi object ke array
                event = Object.values(event);

                // Hapus Updated At
                event.pop();

                // Format Created At
                const createdAt = formatDateID(event[event.length - 1]);
                event[event.length - 1] = createdAt;

                // Menambahkan Aksi
                event.push(
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
                );
                return event;
            });

            setEvents(eventModified);
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
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <div className="row">
                {/* Total Event */}
                <CardInfo type="primary" title="Total Event" value={events.length} icon="fa-list" />
                {/* Event yang dibuka */}
                <CardInfo type="success" title="Event yang dibuka" value={events.filter((event) => event[5] === "buka").length} icon="fa-list" />
                {/* Event yang ditutup */}
                <CardInfo type="danger" title="Event yang ditutup" value={events.filter((event) => event[5] === "tutup").length} icon="fa-list" />
            </div>

            <div className="card shadow mb-4 p-3">
                {loading && <div>Loading...</div>}
                {!loading && (
                    <>
                        <AddEventModal handleAdd={(event) => setEvents([...events, event])} />
                        <TableSearch
                            columns={["ID", "Nama", "Jenis", "Tema", "Tempat", "Status Pendaftaran Panitia", "Status Pendaftaran Peserta", "Waktu Dibuat", "Aksi"]}
                            data={events}
                            defaultOrder={{ column: 0, order: "desc" }}
                            className="mt-4"
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default EventPage;
