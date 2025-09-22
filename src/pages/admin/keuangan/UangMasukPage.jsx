import { useEffect, useState } from "react";
import useUangMasuk from "../../../hooks/useUangMasuk";
import CardInfo from "../../../components/CardInfo";
import { Button } from "react-bootstrap";
import { formatCurrency } from "../../../helpers/currencyHelper";
import TableSearch from "../../../components/TableSearch";
import { formatDateID } from "../../../helpers/dateHelper";

const TableUangMasuk = ({ uangMasuk, handleDelete, handleEdit, handleDetail }) => {
    return (
        <>
            <TableSearch
                defaultOrder={{ column: 0, order: "desc" }}
                className="mt-4"
                header={["ID", "Nominal", "Asal Pemasukan", "Tanggal Pemasukan", "Created At", "Aksi"].map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
                body={uangMasuk.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.jumlah_uang_masuk}</td>
                        <td>{item.asal_pemasukan}</td>
                        <td>{item.tanggal_pemasukan}</td>
                        <td>{formatDateID(item.created_at)}</td>
                        <td>
                            <div className="d-flex gap-2">
                                <button className="btn btn-danger btn-circle btn-sm" onClick={() => handleDelete(item.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button className="btn btn-primary btn-circle btn-sm" onClick={() => handleEdit(item.id)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <a href="#" className="btn btn-info btn-circle btn-sm" onClick={() => handleDetail(item.id)}>
                                    <i className="fas fa-info-circle"></i>
                                </a>
                                {/* Show Bukti Pembayaran */}
                                <a href={item.bukti_pembayaran} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-circle btn-sm">
                                    <i className="fas fa-image"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                ))}
            />
        </>
    );
};

const UangMasukPage = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const { loading, uangMasuk } = useUangMasuk();

    const handleDelete = (id) => {};

    const handleEdit = (id) => {};

    const handleDetail = (id) => {};

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Event</h1>
            </div>
            <div className="row">
                {/* Total Uang Masuk */}
                <CardInfo type="success" title="Uang Masuk" value={formatCurrency(uangMasuk.reduce((total, item) => total + item.jumlah_uang_masuk, 0))} icon="fa-dollar-sign" />
                {/* Total Data Uang Masuk */}
                <CardInfo type="success" title="Data Uang Masuk" value={uangMasuk.length} icon="fa-database" />
            </div>

            <div className="card shadow mb-4 p-3">
                <div>
                    <Button variant="primary" onClick={() => setShowAddModal(true)}>
                        Tambah Uang Masuk
                    </Button>
                </div>

                {loading && <div>Loading...</div>}
                {!loading && <TableUangMasuk uangMasuk={uangMasuk} handleDelete={handleDelete} handleEdit={handleEdit} handleDetail={handleDetail} />}
            </div>
        </>
    );
};

export default UangMasukPage;
