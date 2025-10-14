/**
 * @typedef CreatePesertaRequest
 * @property {string} nim
 * @property {string} nama
 */

/**
 * @typedef UpdatePesertaRequest
 * @property {string} nim
 */

import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

/**
 * Helper: ambil token dari LocalStorage
 */
const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("❌ Token tidak ditemukan di LocalStorage");
    return token;
};

/**
 * Ambil semua Peserta
 * @returns {Promise<Array>} Data peserta (array)
 */
export const getAll = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${BASE_URL_API}/peserta/pendaftaran/index`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Kembalikan array peserta sesuai format API
        if (Array.isArray(response.data)) return response.data;
        if (response.data?.data && Array.isArray(response.data.data)) return response.data.data;
        if (response.data?.peserta && Array.isArray(response.data.peserta)) return response.data.peserta;

        return [];
    } catch (error) {
        console.error("❌ Gagal mengambil data peserta:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Mendaftarkan Peserta
 */
export const create = async (kodeEvent, data) => {
    try {
        const token = getToken();
        const response = await axios.post(`${BASE_URL_API}/pendaftaran-peserta/${kodeEvent}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Gagal mendaftarkan peserta:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Update Peserta berdasarkan ID
 */
export const updateById = async (idPeserta, data) => {
    try {
        const token = getToken();
        const response = await axios.put(`${BASE_URL_API}/peserta/pendaftaran/update/${idPeserta}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Gagal memperbarui data peserta:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Hapus Peserta berdasarkan ID
 */
export const deleteById = async (idPeserta) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${BASE_URL_API}/peserta/pendaftaran/delete/${idPeserta}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Gagal menghapus peserta:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Verifikasi Peserta berdasarkan ID
 * (Tambahan agar tombol verifikasi bisa berfungsi)
 */
export const verifyById = async (idPeserta) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${BASE_URL_API}/peserta/pendaftaran/verify/${idPeserta}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Gagal memverifikasi peserta:", error.response?.data || error.message);
        throw error;
    }
};
