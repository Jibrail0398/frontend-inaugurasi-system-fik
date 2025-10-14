import React, { useEffect, useState } from "react";
import { FaEye, FaSort } from "react-icons/fa";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import {
    getDaftarHadirPeserta,
    updatePresensiManual,
} from "../../services/presensiService";

export default function DaftarHadirPeserta() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const [filterText, setFilterText] = useState("");
    const [filterProdi, setFilterProdi] = useState("");
    const [filterAngkatan, setFilterAngkatan] = useState("");
    const [filterKehadiran, setFilterKehadiran] = useState("");

    const [peserta, setPeserta] = useState([]);
    const [loading, setLoading] = useState(true);

    // Ambil data dari API saat mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("❌ Token tidak ditemukan di localStorage!");
                    setLoading(false);
                    return;
                }

                const response = await getDaftarHadirPeserta(token);
                console.log("✅ Data peserta diterima (API):", response);

                const data = Array.isArray(response)
                    ? response
                    : response?.data ?? [];

                const formatted = data.map((item, index) => {
                    const penerimaan = item.penerimaan_peserta || {};
                    const p = penerimaan.pendaftar_peserta || {};
                    return {
                        id: item.id ?? index + 1,
                        nama: p.nama ?? "-",
                        nim: p.NIM ?? p.nim ?? "-",
                        program_studi: p.divisi ?? p.program_studi ?? "-",
                        angkatan: p.angkatan ?? "-",
                        kelas: p.kelas ?? "-",
                        email: p.email ?? "-",
                        event: p.event?.nama_event ?? "-",
                        kehadiran: item.presensi_datang
                            ? item.presensi_datang === "hadir"
                                ? "Hadir"
                                : "Tidak Hadir"
                            : "Belum Absen",
                        waktu_presensi:
                            item.waktu_presensi_datang ?? item.created_at ?? null,
                    };
                });

                setPeserta(formatted);
            } catch (err) {
                console.error("⚠️ Gagal memuat data peserta:", err);
                setPeserta([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter pencarian
    const filteredData = peserta.filter((p) => {
        const matchText =
            p.nama.toLowerCase().includes(filterText.toLowerCase()) ||
            String(p.nim).includes(filterText);
        const matchProdi =
            filterProdi === "" || p.program_studi === filterProdi;
        const matchAngkatan =
            filterAngkatan === "" ||
            String(p.angkatan) === String(filterAngkatan);
        const matchKehadiran =
            filterKehadiran === "" || p.kehadiran === filterKehadiran;
        return matchText && matchProdi && matchAngkatan && matchKehadiran;
    });

    // ✅ Fungsi update kehadiran ke backend
    const handleKehadiranChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire("Error", "Token tidak ditemukan di localStorage!", "error");
                return;
            }

            const response = await updatePresensiManual(token, id, newStatus.toLowerCase());
            console.log("Update Response:", response);

            // Update data di tabel
            setPeserta((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, kehadiran: newStatus } : p
                )
            );
            setSelectedRow((prev) => ({ ...prev, kehadiran: newStatus }));

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: `Status kehadiran diubah menjadi ${newStatus}.`,
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error("❌ Gagal memperbarui presensi:", err);
            Swal.fire("Error", "Gagal memperbarui presensi manual!", "error");
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Daftar Kehadiran Peserta</h1>
            <p className="mb-4">Berikut adalah daftar kehadiran peserta inaugurasi.</p>

            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
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
                    {loading ? (
                        <p className="text-center">Memuat data...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped w-100 mb-0">
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
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row) => (
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
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                Tidak ada data ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
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
                                        onChange={(e) =>
                                            setFilterProdi(e.target.value)
                                        }
                                        className="form-control"
                                    >
                                        <option value="">Semua Prodi</option>
                                        <option value="Teknik Informatika">
                                            Teknik Informatika
                                        </option>
                                        <option value="Sistem Informasi">
                                            Sistem Informasi
                                        </option>
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label>Angkatan:</label>
                                    <select
                                        value={filterAngkatan}
                                        onChange={(e) =>
                                            setFilterAngkatan(e.target.value)
                                        }
                                        className="form-control"
                                    >
                                        <option value="">Semua Angkatan</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label>Status Kehadiran:</label>
                                    <select
                                        value={filterKehadiran}
                                        onChange={(e) =>
                                            setFilterKehadiran(e.target.value)
                                        }
                                        className="form-control"
                                    >
                                        <option value="">Semua</option>
                                        <option value="Hadir">Hadir</option>
                                        <option value="Tidak Hadir">
                                            Tidak Hadir
                                        </option>
                                        <option value="Belum Absen">
                                            Belum Absen
                                        </option>
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

                            <h5 className="modal-header">
                                Detail Kehadiran Peserta
                            </h5>

                            <div className="modal-details">
                                <p><b>Nama:</b> {selectedRow.nama}</p>
                                <p><b>Prodi:</b> {selectedRow.program_studi}</p>
                                <p><b>Angkatan:</b> {selectedRow.angkatan}</p>
                                <p><b>NIM:</b> {selectedRow.nim}</p>
                                <p><b>Kelas:</b> {selectedRow.kelas}</p>
                                <p><b>Email:</b> {selectedRow.email}</p>
                                <p><b>Event:</b> {selectedRow.event}</p>
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
                                        handleKehadiranChange(
                                            selectedRow.id,
                                            "Hadir"
                                        )
                                    }
                                >
                                    Tandai Hadir
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleKehadiranChange(
                                            selectedRow.id,
                                            "Tidak Hadir"
                                        )
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