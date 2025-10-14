import React, { useState } from "react";
import { FaEye, FaPlus } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function FormDokumentasi() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);

    const [dokumentasi, setDokumentasi] = useState([
        {
        id: 1,
        nama: "Inaugurasi 2025",
        judul: "Pembukaan Acara",
        deskripsi: "Dokumentasi saat pembukaan acara inaugurasi 2025.",
        tanggal: "2025-09-20",
        link: "https://drive.google.com/example",
        },
        {
        id: 2,
        nama: "Inaugurasi 2025",
        judul: "Penampilan Seni",
        deskripsi: "Dokumentasi penampilan seni dari mahasiswa angkatan 2023.",
        tanggal: "2025-09-20",
        link: "https://drive.google.com/example2",
        },
    ]);

    // State form input
    const [formData, setFormData] = useState({
        nama: "",
        judul: "",
        deskripsi: "",
        tanggal: "",
        link: "",
    });

    const handleFormChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (
        !formData.nama ||
        !formData.judul ||
        !formData.deskripsi ||
        !formData.tanggal ||
        !formData.link
        ) {
        alert("Semua field wajib diisi!");
        return;
        }

        const newData = {
        id: dokumentasi.length + 1,
        ...formData,
        };

        setDokumentasi([...dokumentasi, newData]);
        setFormData({
        nama: "",
        judul: "",
        deskripsi: "",
        tanggal: "",
        link: "",
        });
        setShowFormModal(false);
    };

    return (
        <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Form Dokumentasi</h1>
        <p className="mb-4">
            Berikut adalah daftar dokumentasi kegiatan inaugurasi.
        </p>

        {/* Card Table */}
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between">
            <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowFormModal(true)}
            >
                <FaPlus /> Tambah Dokumentasi
            </button>
            </div>

            <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered table-striped w-100">
                <thead className="thead-light">
                    <tr>
                    <th>ID</th>
                    <th>Nama Dokumentasi</th>
                    <th>Judul</th>
                    <th>Tanggal</th>
                    <th>Link</th>
                    <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dokumentasi.map((row) => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.nama}</td>
                        <td>{row.judul}</td>
                        <td>{row.tanggal}</td>
                        <td>
                        <a
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Drive Link
                        </a>
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
                    {dokumentasi.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center">
                        Belum ada dokumentasi
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </div>

        {/* Form Modal */}
        {showFormModal &&
            createPortal(
            <div
                className="modal-overlay"
                onClick={() => setShowFormModal(false)}
            >
                <div
                className="modal-content animate-bounceIn"
                onClick={(e) => e.stopPropagation()}
                >
                <span
                    className="modal-close"
                    onClick={() => setShowFormModal(false)}
                >
                    ✖
                </span>

                <h5 className="modal-header">Tambah Dokumentasi</h5>

                <form onSubmit={handleFormSubmit} className="modal-details">
                    <div className="mb-2">
                    <label>Nama Dokumentasi:</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Contoh: Inaugurasi 2025"
                    />
                    </div>

                    <div className="mb-2">
                    <label>Judul:</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Contoh: Pembukaan Acara"
                    />
                    </div>

                    <div className="mb-2">
                    <label>Deskripsi:</label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Tuliskan deskripsi singkat..."
                    ></textarea>
                    </div>

                    <div className="mb-2">
                    <label>Tanggal:</label>
                    <input
                        type="date"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleFormChange}
                        className="form-control"
                    />
                    </div>

                    <div className="mb-2">
                    <label>Link Drive:</label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Masukkan link Google Drive"
                    />
                    </div>

                    <div className="mt-3 d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowFormModal(false)}
                    >
                        Batal
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Simpan
                    </button>
                    </div>
                </form>
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
                <span
                    className="modal-close"
                    onClick={() => setSelectedRow(null)}
                >
                    ✖
                </span>

                <h5 className="modal-header">Detail Dokumentasi</h5>

                <div className="modal-details">
                    <p>
                    <b>Nama Dokumentasi:</b> {selectedRow.nama}
                    </p>
                    <p>
                    <b>Judul:</b> {selectedRow.judul}
                    </p>
                    <p>
                    <b>Deskripsi:</b> {selectedRow.deskripsi}
                    </p>
                    <p>
                    <b>Tanggal:</b> {selectedRow.tanggal}
                    </p>
                    <p>
                    <b>Link Drive:</b>{" "}
                    <a
                        href={selectedRow.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {selectedRow.link}
                    </a>
                    </p>
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