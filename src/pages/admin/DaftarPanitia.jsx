import React, { useState, useEffect } from "react";
import { FaEye, FaSort } from "react-icons/fa";
import { createPortal } from "react-dom";
import * as panitiaService from "../../services/panitiaService";

export default function DaftarPanitia() {
    const [panitia, setPanitia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterText, setFilterText] = useState("");
    const [filterDivisi, setFilterDivisi] = useState("");
    const [filterAngkatan, setFilterAngkatan] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    // Ambil data panitia + penerimaan
    const fetchPanitia = async () => {
        try {
            setLoading(true);
            const data = await panitiaService.getAllWithPenerimaan();
            setPanitia(data);
        } catch (err) {
            console.error("Gagal memuat data:", err);
            setError("Gagal memuat data panitia. Cek console/network untuk rincian.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPanitia();
    }, []);

    // --- HANDLE VERIFIKASI (pakai penerimaan_id) ---
    const handleVerifikasi = async (penerimaanId, status) => {
        if (!penerimaanId) {
            return alert("⚠️ Data penerimaan panitia belum tersedia. Hubungi admin.");
        }

        try {
            const confirmText =
                status === "diterima"
                    ? "Yakin ingin menyetujui panitia ini?"
                    : "Yakin ingin menolak panitia ini?";
            if (!window.confirm(confirmText)) return;

            const res = await panitiaService.verifyPanitiaById(penerimaanId, status);
            alert(`✅ ${res?.message || "Status berhasil diperbarui"}`);
            setSelectedRow(null);
            fetchPanitia();
        } catch (err) {
            const serverMsg =
                err?.response?.data?.message ||
                JSON.stringify(err?.response?.data) ||
                err.message;
            alert(`❌ Terjadi kesalahan saat verifikasi panitia:\n${serverMsg}`);
        }
    };

    // --- HANDLE HAPUS PANITIA ---
    const handleHapusPanitia = async (id) => {
        if (!id) {
            return alert("⚠️ ID panitia tidak ditemukan.");
        }

        if (!window.confirm("🗑️ Yakin ingin menghapus panitia ini? Data akan hilang permanen.")) {
            return;
        }

        try {
            const res = await panitiaService.deletePanitiaById(id);
            alert(`✅ ${res?.message || "Panitia berhasil dihapus"}`);
            setSelectedRow(null);
            fetchPanitia();
        } catch (err) {
            console.error(err);
            const serverMsg =
                err?.response?.data?.message ||
                JSON.stringify(err?.response?.data) ||
                err.message;
            alert(`❌ Gagal menghapus panitia:\n${serverMsg}`);
        }
    };

    // Filter data panitia
    const filteredData = panitia.filter(
        (p) =>
            (p.nama?.toLowerCase().includes(filterText.toLowerCase()) ||
                p.NIM?.toString().includes(filterText)) &&
            (filterDivisi === "" || p.divisi === filterDivisi) &&
            (filterAngkatan === "" || p.angkatan?.toString() === filterAngkatan)
    );

    if (loading) return <p>Loading data panitia...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Daftar Panitia</h1>
            <p className="mb-4">
                Berikut adalah daftar panitia inaugurasi yang sudah terdaftar.
            </p>

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
                                    <th>NIM</th>
                                    <th>Angkatan</th>
                                    <th>Kelas</th>
                                    <th>Divisi</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
                                            <td>{row.nama}</td>
                                            <td>{row.NIM}</td>
                                            <td>{row.angkatan}</td>
                                            <td>{row.kelas}</td>
                                            <td>{row.divisi}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        row.status_penerimaan === "diterima"
                                                            ? "badge-success"
                                                            : row.status_penerimaan === "ditolak"
                                                            ? "badge-danger"
                                                            : "badge-warning"
                                                    }`}
                                                >
                                                    {row.status_penerimaan || "Menunggu"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    onClick={() => setSelectedRow(row)}
                                                >
                                                    <FaEye /> Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
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
                    <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
                        <div className="modal-content animate-bounceIn" onClick={(e) => e.stopPropagation()}>
                            <span className="modal-close" onClick={() => setShowFilterModal(false)}>✖</span>
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
                                        {[...new Set(panitia.map(p => p.divisi))].map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
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
                                        {[...new Set(panitia.map(p => p.angkatan))].map((a) => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary" onClick={() => setShowFilterModal(false)}>Tutup</button>
                                <button className="btn btn-primary" onClick={() => setShowFilterModal(false)}>Terapkan</button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

            {/* Detail Modal */}
            {selectedRow &&
                createPortal(
                    <div className="modal-overlay" onClick={() => setSelectedRow(null)}>
                        <div className="modal-content animate-bounceIn" onClick={(e) => e.stopPropagation()}>
                            <span className="modal-close" onClick={() => setSelectedRow(null)}>✖</span>
                            <h5 className="modal-header">Detail Panitia</h5>
                            <div className="modal-details">
                                <p><b>Nama:</b> {selectedRow.nama}</p>
                                <p><b>NIM:</b> {selectedRow.NIM}</p>
                                <p><b>Email:</b> {selectedRow.email}</p>
                                <p><b>No WhatsApp:</b> {selectedRow.nomor_whatapp}</p>
                                <p><b>Kelas:</b> {selectedRow.kelas}</p>
                                <p><b>Angkatan:</b> {selectedRow.angkatan}</p>
                                <p><b>Divisi:</b> {selectedRow.divisi}</p>
                                <p><b>Status:</b>{" "}
                                    <span
                                        className={`badge ${
                                            selectedRow.status_penerimaan === "diterima"
                                                ? "badge-success"
                                                : selectedRow.status_penerimaan === "ditolak"
                                                ? "badge-danger"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {selectedRow.status_penerimaan || "Menunggu"}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-4 d-flex justify-content-center gap-3">
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleVerifikasi(selectedRow.penerimaan_id, "diterima")}
                                    disabled={selectedRow.status_penerimaan === "diterima"}
                                >
                                    ✅ Setujui
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleHapusPanitia(selectedRow.id)}
                                >
                                    🗑️ Hapus
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}