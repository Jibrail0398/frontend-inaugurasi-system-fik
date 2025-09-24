import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../helpers/currencyHelper";
import CardInfo from "../../components/CardInfo";

const DashboardPage = () => {
    const [isRealtime, setIsRealtime] = useState(false);
    const intervalRef = useRef(null);

    // Data
    const [totalPeserta, setTotalPeserta] = useState(0);
    const [totalPesertaTerverifikasi, setTotalPesertaTerverifikasi] = useState(0);
    const [totalUangMasuk, setTotalUangMasuk] = useState(0);
    const [totalUangKeluar, setTotalUangKeluar] = useState(0);

    const handleCheckboxRealtime = (e) => {
        setIsRealtime(e.target.checked);
    };

    const fetchData = () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        // Ganti dengan fetch API
        setTimeout(() => {
            setTotalPeserta(1000 + randomNumber);
            setTotalPesertaTerverifikasi(800 + randomNumber);
            setTotalUangMasuk(5000000 + randomNumber * 1000);
            setTotalUangKeluar(2000000 + randomNumber * 500);
        }, 1000);
    };

    // Clear Interval
    const clearRealtime = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const onRealtime = () => {
        if (intervalRef.current) return;

        // Jika belum ada buat interval
        intervalRef.current = setInterval(() => {
            fetchData();
        }, 3000);
    };

    // Handle Data Realtime
    useEffect(() => {
        if (isRealtime) {
            onRealtime();
        } else {
            clearRealtime();
        }
    }, [isRealtime]);

    // Init Data
    useEffect(() => {
        fetchData();

        // Cleanup
        return () => {
            clearRealtime();
        };
    }, []);

    return (
        <>
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>

                {/* Checkbox Data Reatime */}
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="data-realtime" checked={isRealtime} onChange={handleCheckboxRealtime} />
                    <label className="form-check-label" htmlFor="data-realtime">
                        Data Realtime
                    </label>
                </div>
            </div>
            {/* Content Row */}
            <div className="row">
                {/* Peserta Terdaftar */}
                <CardInfo type="primary" title="Peserta Terdaftar" value={totalPeserta} icon="fa-users" />
                {/* Peserta Terverifikasi */}
                <CardInfo type="success" title="Peserta Terverifikasi" value={totalPesertaTerverifikasi} icon="fa-user-check" />
                {/* Uang Masuk */}
                <CardInfo type="warning" title=" Uang Masuk" value={formatCurrency(totalUangMasuk)} icon="fa-dollar-sign" />
                {/* Uang Keluar */}
                <CardInfo type="danger" title="Uang Keluar" value={formatCurrency(totalUangKeluar)} icon="fa-dollar-sign" />
            </div>
        </>
    );
};

export default DashboardPage;
