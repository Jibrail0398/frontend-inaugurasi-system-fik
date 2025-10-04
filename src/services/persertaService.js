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
 * Ambil semua Peserta
 * @param {string} token
 */
export const getAll = async (token) => {
    const response = await axios.get(`${BASE_URL_API}/peserta/pendaftaran/index`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Mendaftarkan Peserta
 * @param {string} kodeEvent Kode Event
 * @param {CreatePesertaRequest} data
 * @param {string} token Token authorisasi
 */
export const create = async (kodeEvent, data, token) => {
    const response = await axios.post(`${BASE_URL_API}/pendaftaran-peserta/${kodeEvent}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Update Peserta berdasarkan ID
 * @param {string} idPeserta ID Peserta
 * @param {UpdatePesertaRequest} data Data Request
 * @param {string} token Token Authorisasi
 */
export const updateById = async (idPeserta, data, token) => {
    const response = await axios.put(`${BASE_URL_API}/peserta/pendaftaran/update/${idPeserta}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Hapus Peserta berdasarkan ID
 * @param {string} idPeserta ID Peserta
 * @param {string} token Token Authorisasi
 */
export const deleteById = async (idPeserta, token) => {
    const response = await axios.delete(`${BASE_URL_API}/peserta/pendaftaran/delete/${idPeserta}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
