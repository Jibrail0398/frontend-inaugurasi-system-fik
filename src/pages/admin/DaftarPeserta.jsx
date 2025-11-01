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
    const [filterVerifikasi, setFilterVerifikasi] = useState("");

    const [selectedRow, setSelectedRow] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    // --- Ambil peserta + mapping status terbaru + log
    const fetchPeserta = async () => {
        try {
            setLoading(true);
            const data = await pesertaService.getAll();

            const pesertaWithStatus = data.map((p) => {
                const latest = p.penerimaan_peserta?.[0] || null;
                const status = latest?.status_pembayaran || "belum lunas";

                console.log(`Peserta: ${p.nama} | NIM: ${p.NIM} | Status: ${status}`);

                return {
                    ...p,
                    latestPenerimaan: latest,
                    penerimaan_id: latest?.id || null,
                    status_pembayaran: status,
                };
            });

            setPeserta(pesertaWithStatus);
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

    // --- Verifikasi peserta
    const handleVerifikasi = async (penerimaanId) => {
        if (!penerimaanId) return alert("⚠️ Data penerimaan peserta belum tersedia.");

        try {
            if (!window.confirm("Yakin ingin memverifikasi peserta ini?")) return;

            console.log("🔹 Memverifikasi Penerimaan ID:", penerimaanId);
            await pesertaService.verifyById(penerimaanId);
            console.log("✅ Verifikasi berhasil untuk ID:", penerimaanId);

            alert("✅ Status peserta berhasil diperbarui");
            setSelectedRow(null);
            fetchPeserta();
        } catch (err) {
            console.error("❌ Terjadi kesalahan saat verifikasi:", err);
            alert("❌ Terjadi kesalahan saat verifikasi peserta");
        }
    };

    // --- Filter peserta
    const filteredData = peserta.filter((p) => {
        const status = p.status_pembayaran ?? "belum lunas";

        return (
            (p.nama?.toLowerCase().includes(filterText.toLowerCase()) ||
                p.NIM?.toString().includes(filterText)) &&
            (filterProdi === "" || p.divisi === filterProdi) &&
            (filterAngkatan === "" || p.angkatan?.toString() === filterAngkatan) &&
            (filterKelas === "" || p.kelas === filterKelas) &&
            (filterVerifikasi === "" ||
                (filterVerifikasi === "1" ? status === "lunas" : status !== "lunas"))
        );
    });

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
                                    <th>Nama</th>
                                    <th>NIM</th>
                                    <th>Angkatan</th>
                                    <th>Kelas</th>
                                    <th>Prodi</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.nama}</td>
                                            <td>{row.NIM}</td>
                                            <td>{row.angkatan}</td>
                                            <td>{row.kelas}</td>
                                            <td>{row.divisi}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        row.status_pembayaran === "lunas"
                                                            ? "badge-success"
                                                            : "badge-warning"
                                                    }`}
                                                >
                                                    {row.status_pembayaran === "lunas"
                                                        ? "Terverifikasi"
                                                        : "Belum Diverifikasi"}
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
                    <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
                        <div
                            className="modal-content animate-bounceIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="modal-close" onClick={() => setShowFilterModal(false)}>
                                ✖
                            </span>
                            <h5 className="modal-header">Filter Peserta</h5>
                            <div className="modal-details">
                                <div className="mb-2">
                                    <label>Prodi:</label>
                                    <select
                                        value={filterProdi}
                                        onChange={(e) => setFilterProdi(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="">Semua Prodi</option>
                                        {[...new Set(peserta.map((p) => p.divisi))].map((d) => (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
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
                                        {[...new Set(peserta.map((p) => p.angkatan))].map((a) => (
                                            <option key={a} value={a}>
                                                {a}
                                            </option>
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
                                        {[...new Set(peserta.map((p) => p.kelas))].map((k) => (
                                            <option key={k} value={k}>
                                                {k}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label>Status:</label>
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
                            <h5 className="modal-header">Detail Peserta</h5>
                            <div className="modal-details">
                                <p><b>Kode Peserta:</b> {selectedRow.kode_peserta}</p>
                                <p><b>Nama:</b> {selectedRow.nama}</p>
                                <p><b>NIM:</b> {selectedRow.NIM}</p>
                                <p><b>Email:</b> {selectedRow.email || "-"}</p>
                                <p><b>Nomor WhatsApp:</b> {selectedRow.nomor_whatapp}</p>
                                <p><b>Angkatan:</b> {selectedRow.angkatan}</p>
                                <p><b>Kelas:</b> {selectedRow.kelas}</p>
                                <p><b>Tanggal Lahir:</b> {selectedRow.tanggal_lahir}</p>
                                <p><b>Ukuran Kaos:</b> {selectedRow.ukuran_kaos}</p>
                                <p><b>Nomor Darurat:</b> {selectedRow.nomor_darurat}</p>
                                <p><b>Tipe Nomor Darurat:</b> {selectedRow.tipe_nomor_darurat}</p>
                                <p><b>Riwayat Penyakit:</b> {selectedRow.riwayat_penyakit}</p>
                                <p><b>Divisi:</b> {selectedRow.divisi}</p>
                                <p>
                                    <b>Status:</b>{" "}
                                    <span
                                        className={`badge ${
                                            selectedRow.status_pembayaran === "lunas"
                                                ? "badge-success"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {selectedRow.status_pembayaran === "lunas"
                                            ? "Terverifikasi"
                                            : "Belum Diverifikasi"}
                                    </span>
                                </p>

                                {/* Bukti pembayaran */}
                                {selectedRow.bukti_pembayaran ? (
                                    <div className="mt-3 text-center">
                                        <p><b>Bukti Pembayaran:</b></p>
                                        <img
                                            src={selectedRow.bukti_pembayaran}
                                            alt="Bukti Pembayaran"
                                            className="img-fluid rounded shadow-sm"
                                            style={{ maxHeight: "300px", objectFit: "contain" }}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-center text-muted">
                                        Tidak ada bukti pembayaran.
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 d-flex justify-content-center gap-3">
                                {selectedRow.status_pembayaran !== "lunas" && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            handleVerifikasi(selectedRow.penerimaan_id)
                                        }
                                    >
                                        ✅ Verifikasi
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