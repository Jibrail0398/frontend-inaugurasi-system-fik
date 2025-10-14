import { useEffect, useState } from "react";
import useUangKeluar from "../../../../hooks/useUangKeluar";
import CardInfo from "../../../../components/CardInfo";
import { Button } from "react-bootstrap";
import { formatCurrency } from "../../../../helpers/currencyHelper";
import TableSearch from "../../../../components/TableSearch";
import { formatDateID } from "../../../../helpers/dateHelper";
import AddModal from "./AddModal";
import DetailModal from "./DetailModal";
import Swal from "sweetalert2";
import BuktiModal from "./BuktiModal";

const TableUangKeluar = ({ uangKeluars, handleDelete, handleEdit, handleDetail, handleShowBukti }) => {
    return (
        <>
            <TableSearch
                defaultOrder={{ column: 0, order: "desc" }}
                className="mt-4"
                header={["ID", "Nominal", "Asal Pengeluaran", "Tanggal Pengeluaran", "Created At", "Aksi"].map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
                body={uangKeluars.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.jumlah_uang_keluar}</td>
                        <td>{item.asal_pengeluaran}</td>
                        <td>{item.tanggal_pengeluaran}</td>
                        <td>{formatDateID(item.created_at)}</td>
                        <td>
                            <div className="d-flex gap-2">
                                <button className="btn btn-danger btn-circle btn-sm" onClick={() => handleDelete(item)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button className="btn btn-primary btn-circle btn-sm" onClick={() => handleEdit(item)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-info btn-circle btn-sm" onClick={() => handleDetail(item)}>
                                    <i className="fas fa-info-circle"></i>
                                </button>
                                {/* Show Bukti Pembayaran */}
                                <button className="btn btn-success btn-circle btn-sm" onClick={() => handleShowBukti(item)}>
                                    <i className="fas fa-image"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            />
        </>
    );
};

const UangKeluarPage = () => {
    // Modal State
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showBuktiModal, setShowBuktiModal] = useState(false);

    const { loading, uangKeluars } = useUangKeluar();

    // Uang Keluar One
    const [uangKeluar, setUangKeluar] = useState({});

    const handleAdd = (dataRequest) => {
        console.log(dataRequest);
    };

    const handleDelete = async (id) => {
        const response = await Swal.fire({
            title: "Delete Uang Keluar",
            text: "Apakah anda yakin ingin menghapus uang keluar ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            cancelButtonText: "Batal",
        });

        const shouldDelete = response.isConfirmed;

        if (!shouldDelete) return;

        Swal.fire({
            title: "Deleted!",
            text: "Uang Keluar berhasil dihapus.",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    const handleEdit = (uangKeluarOne) => {
        setUangKeluarOne(uangKeluarOne);
        setShowAddModal(true);
    };

    const handleDetail = (uangKeluarOne) => {
        setUangKeluarOne(uangKeluarOne);
        setShowDetailModal(true);
    };

    const handleShowBukti = () => {
        setShowBuktiModal(true);
    };

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Uang Keluar</h1>
            </div>
            <div className="row">
                {/* Total Uang Keluar */}
                {/* <CardInfo type="success" title="Uang Keluar" value={formatCurrency(uangKeluar.reduce((total, item) => total + item.jumlah_uang_keluar, 0))} icon="fa-dollar-sign" /> */}
                {/* Total Data Uang Keluar */}
                {/* <CardInfo type="success" title="Data Uang Keluar" value={uangKeluar.length} icon="fa-database" /> */}
            </div>

            <div className="card shadow mb-4 p-3">
                <div>
                    <Button variant="primary" onClick={() => setShowAddModal(true)}>
                        Tambah Uang Keluar
                    </Button>
                </div>

                {loading && <div>Loading...</div>}
                {!loading && <TableUangKeluar uangKeluars={uangKeluars} handleDelete={handleDelete} handleEdit={handleEdit} handleDetail={handleDetail} handleShowBukti={handleShowBukti} />}
            </div>

            <AddModal handleAdd={handleAdd} show={showAddModal} setShow={setShowAddModal} />
            <DetailModal setShow={setShowDetailModal} show={showDetailModal} uangKeluar={uangKeluar} />
            <BuktiModal setShow={setShowBuktiModal} show={showBuktiModal} uangKeluar={uangKeluar} />
        </>
    );
};

export default UangKeluarPage;
