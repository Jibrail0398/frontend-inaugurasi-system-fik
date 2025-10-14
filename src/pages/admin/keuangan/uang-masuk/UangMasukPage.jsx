import { useEffect, useState } from "react";
import useUangMasuk from "../../../../hooks/useUangMasuk";
import CardInfo from "../../../../components/CardInfo";
import { Button } from "react-bootstrap";
import { formatCurrency } from "../../../../helpers/currencyHelper";
import TableSearch from "../../../../components/TableSearch";
import { formatDateID } from "../../../../helpers/dateHelper";
import AddModal from "./AddModal";
import DetailModal from "./DetailModal";
import Swal from "sweetalert2";
import BuktiModal from "./BuktiModal";

const TableUangMasuk = ({ uangMasuk, handleDelete, handleEdit, handleDetail, handleShowBukti }) => {
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

const UangMasukPage = () => {
    // Modal State
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showBuktiModal, setShowBuktiModal] = useState(false);

    const { loading, uangMasuk } = useUangMasuk();

    // Uang Masuk One
    const [uangMasukOne, setUangMasukOne] = useState({});

    const handleAdd = (dataRequest) => {
        console.log(dataRequest);
    };

    const handleDelete = async (id) => {
        const response = await Swal.fire({
            title: "Delete Uang Masuk",
            text: "Apakah anda yakin ingin menghapus uang masuk ini?",
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
            text: "Uang Masuk berhasil dihapus.",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    const handleEdit = (uangMasukOne) => {
        setUangMasukOne(uangMasukOne);
        setShowAddModal(true);
    };

    const handleDetail = (uangMasukOne) => {
        setUangMasukOne(uangMasukOne);
        setShowDetailModal(true);
    };

    const handleShowBukti = () => {
        setShowBuktiModal(true);
    };

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Uang Masuk</h1>
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
                {!loading && <TableUangMasuk uangMasuk={uangMasuk} handleDelete={handleDelete} handleEdit={handleEdit} handleDetail={handleDetail} handleShowBukti={handleShowBukti} />}
            </div>

            <AddModal handleAdd={handleAdd} show={showAddModal} setShow={setShowAddModal} />
            <DetailModal setShow={setShowDetailModal} show={showDetailModal} uangMasuk={uangMasukOne} />
            <BuktiModal setShow={setShowBuktiModal} show={showBuktiModal} uangMasuk={uangMasukOne} />
        </>
    );
};

export default UangMasukPage;
