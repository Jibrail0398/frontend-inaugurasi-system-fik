import { useState } from "react";
import Table from "../../../components/Table";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DetailEventModal from "./DetailEventModal";

const EventPage = () => {
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const [events, setEvents] = useState([
        [
            "Event 1",
            "2023-01-01",
            "2023-01-31",
            "Event 1 Description",
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
            </div>,
        ],
    ]);

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

        const newEvents = events.filter((event) => event[0] !== id);
        setEvents(newEvents);
    };

    const handleEdit = (id) => {
        // console.log(showEditModal);
        setShowEditModal(!showEditModal);
    };

    const handleDetail = (id) => {
        setShowDetailModal(!showDetailModal);
    };

    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Events</h6>
                </div>
                {/* Add Event */}
                <AddEventModal handleAdd={(event) => setEvents([...events, event])} />
                <div className="card-body">
                    <Table columns={["Event", "Start Date", "End Date", "Description", "Action"]} data={events} />
                </div>
            </div>
            <EditEventModal event={{ nama: "Event 1", email: "2d0yj@example.com" }} handleEdit={(event) => setEvents([...events, event])} show={showEditModal} setShow={setShowEditModal} />
            <DetailEventModal event={{ nama: "Event 1", email: "2d0yj@example.com" }} show={showDetailModal} setShow={setShowDetailModal} />
        </>
    );
};

export default EventPage;
