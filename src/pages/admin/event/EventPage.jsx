import { useState } from "react";
import Table from "../../../components/Table";
import { Link, useNavigate } from "react-router";

const EventPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([
        [
            "Event 1",
            "2023-01-01",
            "2023-01-31",
            "Event 1 Description",
            <div className="d-flex gap-4">
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

    const handleDelete = (id) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this event?");

        if (!shouldDelete) return;

        const newEvents = events.filter((event) => event[0] !== id);
        setEvents(newEvents);
    };

    const handleEdit = (id) => {
        navigate(`/admin/events/${id}/edit`);
    };

    const handleDetail = (id) => {
        navigate(`/admin/events/${id}`);
    };

    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Events</h6>
                </div>
                <div className="card-body">
                    <Table columns={["Event", "Start Date", "End Date", "Description", "Action"]} data={events} />
                </div>
            </div>
        </>
    );
};

export default EventPage;
