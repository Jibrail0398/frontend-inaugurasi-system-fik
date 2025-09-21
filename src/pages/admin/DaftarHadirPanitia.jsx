import React, { useState } from "react";
import { FaEye, FaSort } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function DaftarKehadiran() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const [filterText, setFilterText] = useState(""); 
    const [filterProdi, setFilterProdi] = useState("");
    const [filterAngkatan, setFilterAngkatan] = useState("");
    const [filterKehadiran, setFilterKehadiran] = useState("");

    const [peserta, setPeserta] = useState([
        {
        id: 1,
        nama: "Ryu Senna Fadhlika Al Aziz",
        program_studi: "Teknik Informatika",
        angkatan: 2023,
        nim: 22416255201034,
        kelas: "IF23D",
        email: "ryu123@gmail.com",
        kehadiran: "Belum Absen",
        },
        {
        id: 2,
        nama: "Budi Santoso",
        program_studi: "Sistem Informasi",
        angkatan: 2022,
        nim: 22416255201035,
        kelas: "IF22A",
        email: "budi123@gmail.com",
        kehadiran: "Hadir",
        },
    ]);

    const filteredData = peserta.filter(
        (p) =>
        (p.nama.toLowerCase().includes(filterText.toLowerCase()) ||
            p.nim.toString().includes(filterText)) &&
        (filterProdi === "" || p.program_studi === filterProdi) &&
        (filterAngkatan === "" || p.angkatan.toString() === filterAngkatan) &&
        (filterKehadiran === "" || p.kehadiran === filterKehadiran)
    );

    const handleKehadiranChange = (id, newStatus) => {
        setPeserta((prev) =>
        prev.map((p) => (p.id === id ? { ...p, kehadiran: newStatus } : p))
        );
        setSelectedRow((prev) => ({ ...prev, kehadiran: newStatus }));
    };

    return (
        <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Daftar Kehadiran Peserta</h1>
        <p className="mb-4">
            Berikut adalah daftar kehadiran peserta inaugurasi.
        </p>

        {/* Card Table */}
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between">
            <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowFilterModal(true)}
            >
                <FaSort /> Filter
            </button>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Cari nama atau NIM..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="form-control form-control-sm w-25"
            />
            </div>

            <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered table-striped w-100">
                <thead className="thead-light">
                    <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Prodi</th>
                    <th>Angkatan</th>
                    <th>NIM</th>
                    <th>Kelas</th>
                    <th>Kehadiran</th>
                    <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.nama}</td>
                        <td>{row.program_studi}</td>
                        <td>{row.angkatan}</td>
                        <td>{row.nim}</td>
                        <td>{row.kelas}</td>
                        <td>
                        <span
                            className={`badge ${
                            row.kehadiran === "Hadir"
                                ? "badge-success"
                                : row.kehadiran === "Tidak Hadir"
                                ? "badge-danger"
                                : "badge-warning"
                            }`}
                        >
                            {row.kehadiran}
                        </span>
                        </td>
                        <td>
                        <button
                            className="btn btn-sm btn-info"
                            onClick={() => setSelectedRow(row)}
                        >
                            <FaEye /> Detail
                        </button>
                        </td>
                    </tr>
                    ))}
                    {filteredData.length === 0 && (
                    <tr>
                        <td colSpan="8" className="text-center">
                        Tidak ada data
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </div>

        {/* Filter Modal */}
        {showFilterModal &&
            createPortal(
            <div
                className="modal-overlay"
                onClick={() => setShowFilterModal(false)}
            >
                <div
                className="modal-content animate-bounceIn"
                onClick={(e) => e.stopPropagation()}
                >
                <span
                    className="modal-close"
                    onClick={() => setShowFilterModal(false)}
                >
                    ✖
                </span>

                <h5 className="modal-header">Filter Kehadiran</h5>

                <div className="modal-details">
                    <div className="mb-2">
                    <label>Program Studi:</label>
                    <select
                        value={filterProdi}
                        onChange={(e) => setFilterProdi(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Semua Prodi</option>
                        <option value="Teknik Informatika">Teknik Informatika</option>
                        <option value="Sistem Informasi">Sistem Informasi</option>
                    </select>
                    </div>

                    <div className="mb-2">
                    <label>Angkatan:</label>
                    <select
                        value={filterAngkatan}
                        onChange={(e) => setFilterAngkatan(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Semua Angkatan</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                    </div>

                    <div className="mb-2">
                    <label>Status Kehadiran:</label>
                    <select
                        value={filterKehadiran}
                        onChange={(e) => setFilterKehadiran(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Semua</option>
                        <option value="Hadir">Hadir</option>
                        <option value="Tidak Hadir">Tidak Hadir</option>
                        <option value="Belum Absen">Belum Absen</option>
                    </select>
                    </div>
                </div>

                <div className="mt-4 d-flex justify-content-end gap-2">
                    <button
                    className="btn btn-secondary"
                    onClick={() => setShowFilterModal(false)}
                    >
                    Tutup
                    </button>
                    <button
                    className="btn btn-primary"
                    onClick={() => setShowFilterModal(false)}
                    >
                    Terapkan
                    </button>
                </div>
                </div>
            </div>,
            document.body
            )}

        {/* Detail Modal */}
        {selectedRow &&
            createPortal(
            <div className="modal-overlay" onClick={() => setSelectedRow(null)}>
                <div
                className="modal-content animate-bounceIn"
                onClick={(e) => e.stopPropagation()}
                >
                <span className="modal-close" onClick={() => setSelectedRow(null)}>
                    ✖
                </span>

                <h5 className="modal-header">Detail Kehadiran Peserta</h5>

                <div className="modal-details">
                    <p><b>Nama:</b> {selectedRow.nama}</p>
                    <p><b>Prodi:</b> {selectedRow.program_studi}</p>
                    <p><b>Angkatan:</b> {selectedRow.angkatan}</p>
                    <p><b>NIM:</b> {selectedRow.nim}</p>
                    <p><b>Kelas:</b> {selectedRow.kelas}</p>
                    <p><b>Email:</b> {selectedRow.email}</p>
                    <p>
                    <b>Status Kehadiran:</b>{" "}
                    <span
                        className={
                        selectedRow.kehadiran === "Hadir"
                            ? "text-success font-weight-bold"
                            : selectedRow.kehadiran === "Tidak Hadir"
                            ? "text-danger font-weight-bold"
                            : "text-warning font-weight-bold"
                        }
                    >
                        {selectedRow.kehadiran}
                    </span>
                    </p>
                </div>

                <div className="mt-4 d-flex justify-content-center gap-2">
                    <button
                    className="btn btn-success"
                    onClick={() =>
                        handleKehadiranChange(selectedRow.id, "Hadir")
                    }
                    >
                    Tandai Hadir
                    </button>
                    <button
                    className="btn btn-danger"
                    onClick={() =>
                        handleKehadiranChange(selectedRow.id, "Tidak Hadir")
                    }
                    >
                    Tandai Tidak Hadir
                    </button>
                </div>

                <div className="mt-3 text-center">
                    <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedRow(null)}
                    >
                    Tutup
                    </button>
                </div>
                </div>
            </div>,
            document.body
            )}
        </div>
    );
}