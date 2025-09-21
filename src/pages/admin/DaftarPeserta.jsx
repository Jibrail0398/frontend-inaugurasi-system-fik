import React, { useState } from "react";
import { FaEye, FaSort } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function DaftarPeserta() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const [filterText, setFilterText] = useState("");
    const [filterProdi, setFilterProdi] = useState("");
    const [filterAngkatan, setFilterAngkatan] = useState("");
    const [filterPembayaran, setFilterPembayaran] = useState("");

    const [peserta, setPeserta] = useState([
        {
        id: 1,
        nama: "Ryu Senna Fadhlika Al Aziz",
        program_studi: "Teknik Informatika",
        angkatan: 2023,
        nim: 22416255201034,
        kelas: "IF23D",
        tempat_tanggal_lahir: "Karawang, 23 September 2004",
        nomor_whatsapp: "123456789",
        email: "ryu123@gmail.com",
        ukuran_kaos: "XXL",
        riwayat_penyakit: "pusing",
        pembayaran: "Belum Lunas",
        jumlah_bayar: 150000,
        },
        {
        id: 2,
        nama: "Budi Santoso",
        program_studi: "Sistem Informasi",
        angkatan: 2022,
        nim: 22416255201035,
        kelas: "IF22A",
        tempat_tanggal_lahir: "Karawang, 10 Juli 2004",
        nomor_whatsapp: "123456789",
        email: "budi123@gmail.com",
        ukuran_kaos: "XL",
        riwayat_penyakit: "asma",
        pembayaran: "Lunas",
        jumlah_bayar: 150000,
        },
    ]);

    const filteredData = peserta.filter(
        (p) =>
        (p.nama.toLowerCase().includes(filterText.toLowerCase()) ||
            p.nim.toString().includes(filterText)) &&
        (filterProdi === "" || p.program_studi === filterProdi) &&
        (filterAngkatan === "" || p.angkatan.toString() === filterAngkatan) &&
        (filterPembayaran === "" || p.pembayaran === filterPembayaran)
    );

    const handleSudahBayar = (row) => {
        setPeserta((prev) =>
        prev.map((p) => (p.id === row.id ? { ...p, pembayaran: "Lunas" } : p))
        );
        setSelectedRow((prev) => ({ ...prev, pembayaran: "Lunas" }));
    };

    return (
        <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Daftar Peserta</h1>
        <p className="mb-4">Berikut adalah daftar peserta inaugurasi yang sudah terdaftar.</p>

        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between">
            <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowFilterModal(true)}
            >
                <FaSort /> Filter
            </button>

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
                    <th>Status Pembayaran</th>
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
                        <td>
                        <span
                            className={`badge ${
                            row.pembayaran === "Lunas" ? "badge-primary" : "badge-warning"
                            }`}
                        >
                            {row.pembayaran}
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
                        <td colSpan="7" className="text-center">
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

                <h5 className="modal-header">Filter Peserta</h5>

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
                    <label>Status Pembayaran:</label>
                    <select
                        value={filterPembayaran}
                        onChange={(e) => setFilterPembayaran(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Semua Status</option>
                        <option value="Belum Lunas">Belum Lunas</option>
                        <option value="Lunas">Lunas</option>
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
            <div
                className="modal-overlay"
                onClick={() => setSelectedRow(null)}
            >
                <div
                className="modal-content animate-bounceIn"
                onClick={(e) => e.stopPropagation()}
                >
                <span
                    className="modal-close"
                    onClick={() => setSelectedRow(null)}
                >
                    ✖
                </span>

                <h5 className="modal-header">Detail Peserta</h5>

                <div className="modal-details">
                    <p><b>Nama:</b> {selectedRow.nama}</p>
                    <p><b>Prodi:</b> {selectedRow.program_studi}</p>
                    <p><b>Angkatan:</b> {selectedRow.angkatan}</p>
                    <p><b>NIM:</b> {selectedRow.nim}</p>
                    <p><b>Kelas:</b> {selectedRow.kelas}</p>
                    <p><b>TTL:</b> {selectedRow.tempat_tanggal_lahir}</p>
                    <p><b>No. WA:</b> {selectedRow.nomor_whatsapp}</p>
                    <p><b>Email:</b> {selectedRow.email}</p>
                    <p><b>Ukuran Baju:</b> {selectedRow.ukuran_kaos}</p>
                    <p><b>Riwayat Penyakit:</b> {selectedRow.riwayat_penyakit}</p>
                    <p>
                    <b>Status Pembayaran:</b>{" "}
                    <span
                        className={
                        selectedRow.pembayaran === "Lunas"
                            ? "text-blue-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                    >
                        {" "}
                        {selectedRow.pembayaran}
                    </span>
                    </p>
                </div>

                <div className="mt-4 d-flex justify-center gap-2">
                    {selectedRow.pembayaran === "Belum Lunas" && (
                    <button
                        className="btn-yellow"
                        onClick={() => handleSudahBayar(selectedRow)}
                    >
                        Tandai Sudah Bayar
                    </button>
                    )}
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
