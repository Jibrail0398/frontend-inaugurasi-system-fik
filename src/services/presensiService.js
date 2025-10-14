import axios from "axios";
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export const getDaftarHadirPanitia = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL_API}/presensi/panitia`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response API:", response.data);

        // 🔹 Ambil hanya array dari respons
        return response.data.data ?? [];
    } catch (error) {
        console.error("Gagal fetch daftar hadir panitia:", error);
        return [];
    }
};

export const getDaftarHadirPeserta = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL_API}/presensi/peserta`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response API (Peserta):", response.data);

        return response.data.data ?? [];
    } catch (error) {
        console.error("Gagal fetch daftar hadir peserta:", error);
        return [];
    }
};

export const updatePresensiManual = async (token, id, status) => {
    try {
        const response = await axios.put(
            `${BASE_URL_API}/presensi/peserta/update/${id}`,
            {
                presensi_datang: status === "hadir" ? "hadir" : "tidak hadir",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("✅ Presensi manual berhasil diperbarui:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Gagal memperbarui presensi manual:", error);
        throw error;
    }
};

export const updatePresensiPanitia = async (token, id, status) => {
    try {
        const response = await axios.put(
            `${BASE_URL_API}/presensi/panitia/update/${id}`,
            {
                presensi_datang: status === "hadir" ? "hadir" : "tidak hadir",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("✅ Presensi panitia berhasil diperbarui:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Gagal memperbarui presensi panitia:", error);
        throw error;
    }
};
