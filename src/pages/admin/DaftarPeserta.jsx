import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye, FaSort } from "react-icons/fa";

export default function DaftarPeserta() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [filterModal, setFilterModal] = useState(false);
    const [filterText, setFilterText] = useState("");
    const [filterProdi, setFilterProdi] = useState("");
    const [filterAngkatan, setFilterAngkatan] = useState("");

    const data = [
        { id: 1, nama: "Ryu Senna Fadhlika Al Aziz", program_studi: "Informatika", angkatan: 2023, nim: 22416255201034, kelas: "IF23D", tempat_tanggal_lahir: "Karawang, 23 September 2004", nomor_whatsapp: "123456789", email: "ryu123@gmail.com", ukuran_kaos: "XXL", no_darurat: "1234567890", riwayat_penyakit: "pusing", pembayaran: "Lunas"},
        { id: 2, nama: "Budi Santoso", program_studi: "Sistem Informasi", angkatan: 2022, nim: 22416255201035, kelas: "IF22A", tempat_tanggal_lahir: "Karawang, 10 Juli 2004", nomor_whatsapp: "123456789", email: "budi123@gmail.com", ukuran_kaos: "XL", no_darurat: "1234567890", riwayat_penyakit: "asma", pembayaran: "Lunas" },
        { id: 3, nama: "Siti Aisyah", program_studi: "Teknik Komputer", angkatan: 2023, nim: 22416255201036, kelas: "IF23C", tempat_tanggal_lahir: "Karawang, 5 Desember 2004", nomor_whatsapp: "123456789", email: "siti123@gmail.com", ukuran_kaos: "M", no_darurat: "1234567890", riwayat_penyakit: "tidak ada", pembayaran: "Lunas" },
    ];

    const filteredData = data.filter(item => 
        (item.nama.toLowerCase().includes(filterText.toLowerCase()) || 
        item.nim.toString().includes(filterText)) &&
        (filterProdi === "" || item.program_studi === filterProdi) &&
        (filterAngkatan === "" || item.angkatan.toString() === filterAngkatan)
    );

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: "80px" },
        { name: "Nama", selector: row => row.nama, sortable: true },
        { name: "Prodi", selector: row => row.program_studi, sortable: true },
        { name: "Angkatan", selector: row => row.angkatan, sortable: true },
        { name: "NIM", selector: row => row.nim, sortable: true },
        {
        name: "Detail",
        cell: row => (
            <button onClick={() => setSelectedRow(row)} className="p-2 bg-blue-100 rounded hover:bg-blue-200">
            <FaEye className="text-blue-600" />
            </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        },
    ];

    const customStyles = {
        headCells: { style: { backgroundColor: "#f8f9fc", fontWeight: "600", fontSize: "14px", color: "#4e73df" } },
        rows: { style: { fontSize: "14px" } },
    };

    const prodiOptions = [...new Set(data.map(d => d.program_studi))];
    const angkatanOptions = [...new Set(data.map(d => d.angkatan))];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-md rounded-lg">
            <div className="px-4 py-3 border-b flex justify-between items-center">
            <button
                onClick={() => setFilterModal(true)}
                className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100"
            >
                <FaSort /> Sort / Filter
            </button>
            <input
                type="text"
                placeholder="Cari nama atau NIM..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                className="border rounded px-3 py-1 w-1/3"
            />
            </div>

            <div className="p-4">
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
            />
            </div>
        </div>

        {/* Modal Filter */}
        {filterModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative animate-bounceIn">
                <button
                onClick={() => setFilterModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                ✖
                </button>
                <h2 className="text-lg font-bold mb-4">Filter Peserta</h2>
                <div className="flex flex-col gap-3">
                <select
                    value={filterProdi}
                    onChange={e => setFilterProdi(e.target.value)}
                    className="border rounded px-3 py-1"
                >
                    <option value="">Semua Prodi</option>
                    {prodiOptions.map(prodi => <option key={prodi} value={prodi}>{prodi}</option>)}
                </select>
                <select
                    value={filterAngkatan}
                    onChange={e => setFilterAngkatan(e.target.value)}
                    className="border rounded px-3 py-1"
                >
                    <option value="">Semua Angkatan</option>
                    {angkatanOptions.map(ang => <option key={ang} value={ang}>{ang}</option>)}
                </select>
                <button
                    onClick={() => setFilterModal(false)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Terapkan
                </button>
                </div>
            </div>
            </div>
        )}

        {/* Modal Detail */}
        {selectedRow && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative animate-bounceIn">
                <button
                onClick={() => setSelectedRow(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Detail Peserta</h2>

                <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold text-right">Nama</span>
                <span className="text-center">:</span>
                <span>{selectedRow.nama}</span>

                <span className="font-semibold text-right">Program Studi</span>
                <span className="text-center">:</span>
                <span>{selectedRow.program_studi}</span>

                <span className="font-semibold text-right">Angkatan</span>
                <span className="text-center">:</span>
                <span>{selectedRow.angkatan}</span>

                <span className="font-semibold text-right">NIM</span>
                <span className="text-center">:</span>
                <span>{selectedRow.nim}</span>

                <span className="font-semibold text-right">Kelas</span>
                <span className="text-center">:</span>
                <span>{selectedRow.kelas}</span>

                <span className="font-semibold text-right">Tempat, Tanggal Lahir</span>
                <span className="text-center">:</span>
                <span>{selectedRow.tempat_tanggal_lahir}</span>

                <span className="font-semibold text-right">No. WA</span>
                <span className="text-center">:</span>
                <span>{selectedRow.nomor_whatsapp}</span>

                <span className="font-semibold text-right">Email</span>
                <span className="text-center">:</span>
                <span>{selectedRow.email}</span>

                <span className="font-semibold text-right">Ukuran Baju</span>
                <span className="text-center">:</span>
                <span>{selectedRow.ukuran_kaos}</span>

                <span className="font-semibold text-right">No. Darurat</span>
                <span className="text-center">:</span>
                <span>{selectedRow.no_darurat}</span>

                <span className="font-semibold text-right">Riwayat Penyakit</span>
                <span className="text-center">:</span>
                <span>{selectedRow.riwayat_penyakit}</span>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}