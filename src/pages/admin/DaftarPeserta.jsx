import React, { useState, useEffect } from "react";
import { FaEye, FaSort } from "react-icons/fa";
import { createPortal } from "react-dom";
import * as pesertaService from "../../services/persertaService";

export default function DaftarPeserta() {
    const [peserta, setPeserta] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filterText, setFilterText] = useState("");
    const [filterProdi, setFilterProdi] = useState("");
    const [filterAngkatan, setFilterAngkatan] = useState("");
    const [filterKelas, setFilterKelas] = useState("");
    const [filterDivisi, setFilterDivisi] = useState("");
    const [filterVerifikasi, setFilterVerifikasi] = useState("");

    const [selectedRow, setSelectedRow] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    // Ambil data peserta dari API
    const fetchPeserta = async () => {
        try {
            setLoading(true);
            const pesertaData = await pesertaService.getAll();
            setPeserta(pesertaData);
        } catch (err) {
            console.error("Gagal memuat data:", err);
            setError("Gagal memuat data peserta");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeserta();
    }, []);

    // Filter peserta
    const filteredData = peserta.filter(
        (p) =>
            (p.nama?.toLowerCase().includes(filterText.toLowerCase()) ||
                p.NIM?.toString().includes(filterText)) &&
            (filterProdi === "" || p.program_studi === filterProdi) &&
            (filterAngkatan === "" || p.angkatan?.toString() === filterAngkatan) &&
            (filterKelas === "" || p.kelas === filterKelas) &&
            (filterDivisi === "" || p.divisi === filterDivisi) &&
            (filterVerifikasi === "" || p.is_verified?.toString() === filterVerifikasi)
    );

    // ✅ Verifikasi peserta (langsung update tampilan)
    const handleVerify = async (idPeserta) => {
        try {
            await pesertaService.updateById(idPeserta, { is_verified: 1, rejected: 0 });
            alert("✅ Peserta berhasil diverifikasi!");
            
            // Update langsung di state agar status berubah tanpa fetch ulang
            setPeserta((prev) =>
                prev.map((p) =>
                    p.id === idPeserta ? { ...p, is_verified: 1, rejected: 0 } : p
                )
            );

            setSelectedRow(null);
        } catch (err) {
            console.error(err);
            alert("❌ Gagal verifikasi peserta");
        }
    };

    // 🚫 Tolak peserta (langsung update tampilan)
    const handleReject = async (idPeserta) => {
        try {
            await pesertaService.updateById(idPeserta, { is_verified: 0, rejected: 1 });
            alert("🚫 Peserta berhasil ditolak!");
            
            // Update langsung di state agar status berubah tanpa fetch ulang
            setPeserta((prev) =>
                prev.map((p) =>
                    p.id === idPeserta ? { ...p, is_verified: 0, rejected: 1 } : p
                )
            );

            setSelectedRow(null);
        } catch (err) {
            console.error(err);
            alert("❌ Gagal menolak peserta");
        }
    };

    if (loading) return <p>Loading data peserta...</p>;
    if (error) return <p className="text-danger">{error}</p>;

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
                                            <td>{row.program_studi}</td>
                                            <td>{row.angkatan}</td>
                                            <td>{row.NIM}</td>
                                            <td>{row.kelas}</td>
                                            <td>{row.divisi}</td>
                                            <td>
                                                {row.is_verified === 1 ? (
                                                    <span className="badge badge-primary">Terverifikasi</span>
                                                ) : row.rejected === 1 ? (
                                                    <span className="badge badge-danger">Ditolak</span>
                                                ) : (
                                                    <span className="badge badge-warning">Belum Diverifikasi</span>
                                                )}
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
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
                                        {[...new Set(peserta.map(p => p.program_studi))].map(p => (
                                            <option key={p} value={p}>{p}</option>
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
                                        {[...new Set(peserta.map(p => p.angkatan))].map(a => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label>Kelas:</label>
                                    <select
                                        value={filterKelas}
                                        onChange={(e) => setFilterKelas(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="">Semua Kelas</option>
                                        {[...new Set(peserta.map(p => p.kelas))].map(k => (
                                            <option key={k} value={k}>{k}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label>Divisi:</label>
                                    <select
                                        value={filterDivisi}
                                        onChange={(e) => setFilterDivisi(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="">Semua Divisi</option>
                                        {[...new Set(peserta.map(p => p.divisi))].map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label>Status Verifikasi:</label>
                                    <select
                                        value={filterVerifikasi}
                                        onChange={(e) => setFilterVerifikasi(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="">Semua</option>
                                        <option value="1">Terverifikasi</option>
                                        <option value="0">Belum Diverifikasi</option>
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
                            <h5 className="modal-header">Detail Peserta</h5>
                            <div className="modal-details">
                                <p><b>Nama:</b> {selectedRow.nama}</p>
                                <p><b>Prodi:</b> {selectedRow.program_studi}</p>
                                <p><b>Angkatan:</b> {selectedRow.angkatan}</p>
                                <p><b>NIM:</b> {selectedRow.NIM}</p>
                                <p><b>Kelas:</b> {selectedRow.kelas}</p>
                                <p><b>Divisi:</b> {selectedRow.divisi}</p>
                                <p><b>Ukuran Kaos:</b> {selectedRow.ukuran_kaos}</p>
                                <p><b>Riwayat Penyakit:</b> {selectedRow.riwayat_penyakit}</p>
                                <p>
                                    <b>Status:</b>{" "}
                                    {selectedRow.is_verified === 1 ? (
                                        <span className="badge badge-primary">Terverifikasi</span>
                                    ) : selectedRow.rejected === 1 ? (
                                        <span className="badge badge-danger">Ditolak</span>
                                    ) : (
                                        <span className="badge badge-warning">Belum Diverifikasi</span>
                                    )}
                                </p>
                            </div>

                            <div className="mt-4 d-flex justify-content-center gap-2">
                                {selectedRow.is_verified !== 1 && selectedRow.rejected !== 1 && (
                                    <>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleVerify(selectedRow.id)}
                                        >
                                            Verifikasi
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleReject(selectedRow.id)}
                                        >
                                            Tolak
                                        </button>
                                    </>
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