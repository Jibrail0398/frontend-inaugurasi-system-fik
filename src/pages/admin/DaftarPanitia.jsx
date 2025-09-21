import React, { useState } from "react";
import { FaEye, FaSort } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function DaftarPanitia() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const [filterText, setFilterText] = useState(""); // search bar
    const [filterDivisi, setFilterDivisi] = useState("");
    const [filterProdi, setFilterProdi] = useState("");
    const [filterAngkatan, setFilterAngkatan] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const [panitia, setPanitia] = useState([
        {
        id: 1,
        nama: "Ryu Senna Fadhlika Al Aziz",
        program_studi: "Teknik Informatika",
        angkatan: 2023,
        nim: 22416255201034,
        kelas: "IF23D",
        tempat_tanggal_lahir: "Karawang, 23 September 2004",
        email: "ryu123@gmail.com",
        ukuran_kaos: "XXL",
        riwayat_penyakit: "pusing",
        divisi: "PDD",
        status: "Menunggu Verifikasi",
        },
        {
        id: 2,
        nama: "Budi Santoso",
        program_studi: "Sistem Informasi",
        angkatan: 2022,
        nim: 22416255201035,
        kelas: "IF22A",
        tempat_tanggal_lahir: "Karawang, 10 Juli 2004",
        email: "budi123@gmail.com",
        ukuran_kaos: "XL",
        riwayat_penyakit: "asma",
        divisi: "Acara",
        status: "Diterima",
        },
    ]);

    const filteredData = panitia.filter(
        (p) =>
        (p.nama.toLowerCase().includes(filterText.toLowerCase()) ||
            p.nim.toString().includes(filterText)) &&
        (filterDivisi === "" || p.divisi === filterDivisi) &&
        (filterProdi === "" || p.program_studi === filterProdi) &&
        (filterAngkatan === "" || p.angkatan.toString() === filterAngkatan) &&
        (filterStatus === "" || p.status === filterStatus)
    );

    const handleStatusChange = (id, newStatus) => {
        setPanitia((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
        setSelectedRow((prev) => ({ ...prev, status: newStatus }));
    };

    return (
        <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Daftar Panitia</h1>
        <p className="mb-4">
            Berikut adalah daftar panitia inaugurasi yang sudah terdaftar.
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
                    <th>Divisi</th>
                    <th>Status</th>
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
                        <td>{row.divisi}</td>
                        <td>
                        <span
                            className={`badge ${
                            row.status === "Diterima"
                                ? "badge-success"
                                : row.status === "Ditolak"
                                ? "badge-danger"
                                : "badge-warning"
                            }`}
                        >
                            {row.status}
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

                <h5 className="modal-header">Filter Panitia</h5>

                <div className="modal-details">
                    <div className="mb-2">
                    <label>Divisi:</label>
                    <select
                        value={filterDivisi}
                        onChange={(e) => setFilterDivisi(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Semua Divisi</option>
                        <option value="PDD">PDD</option>
                        <option value="Acara">Acara</option>
                        <option value="Humas">Humas</option>
                        <option value="Konsumsi">Konsumsi</option>
                        <option value="Logistik">Logistik</option>
                    </select>
                    </div>

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
                    <label>Status:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Semua Status</option>
                        <option value="Menunggu Verifikasi">
                        Menunggu Verifikasi
                        </option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                    </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
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

                <h5 className="modal-header">Detail Panitia</h5>

                <div className="modal-details">
                <p><b>Nama:</b> {selectedRow.nama}</p>
                <p><b>Prodi:</b> {selectedRow.program_studi}</p>
                <p><b>Angkatan:</b> {selectedRow.angkatan}</p>
                <p><b>NIM:</b> {selectedRow.nim}</p>
                <p><b>Kelas:</b> {selectedRow.kelas}</p>
                <p><b>TTL:</b> {selectedRow.tempat_tanggal_lahir}</p>
                <p><b>Email:</b> {selectedRow.email}</p>
                <p><b>Ukuran Baju:</b> {selectedRow.ukuran_kaos}</p>
                <p><b>Riwayat Penyakit:</b> {selectedRow.riwayat_penyakit}</p>
                <p><b>Divisi:</b> {selectedRow.divisi}</p>
                <p>
                    <b>Status:</b>{" "}
                    <span
                    className={
                        selectedRow.status === "Diterima"
                        ? "text-success font-weight-bold"
                        : selectedRow.status === "Ditolak"
                        ? "text-danger font-weight-bold"
                        : "text-warning font-weight-bold"
                    }
                    >
                    {selectedRow.status}
                    </span>
                </p>
                </div>

                {/* Hanya 2 tombol aksi */}
                <div className="mt-4 d-flex justify-content-center gap-2">
                <button
                    className="btn btn-success"
                    onClick={() => handleStatusChange(selectedRow.id, "Diterima")}
                >
                    ✅ Tandai Diterima
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => handleStatusChange(selectedRow.id, "Ditolak")}
                >
                    ❌ Tandai Ditolak
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
