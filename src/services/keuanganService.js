/**
 * @typedef Keuangan
 * @property {string} id
 */

/**
 * @typedef CreateUangMasukRequest
 * @property {number} jumlah_uang_masuk
 * @property {string} asal_pemasukan
 * @property {string} bukti_pemasukan
 * @property {number} keuangan_id
 * @property {string} tanggal_pemasukan
 */

import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

/**
 * Get all Keuangan
 * @param {string} token
 * @returns {Promise<Object>}
 */
export const getKeuangan = async (token) => {
    const response = await axios.get(`${BASE_URL_API}/keuangan`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Get all uang masuk
 * @param {string} token
 * @returns {Promise<Object>}
 */
export const getAllUangMasuk = async (token) => {
    const response = await axios.get(`${BASE_URL_API}/uang-masuk/index`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Get all uang keluar
 * @param {string} token
 */
export const getAllUangKeluar = (token) => {
    const response = axios.get(`${BASE_URL_API}/uang-keluar`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Create uang masuk
 * @param {CreateUangMasukRequest} data
 * @param {string} token
 */
export const createUangMasuk = async (data, token) => {
    console.log(data);
    const response = await axios.post(`${BASE_URL_API}/uang-masuk/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const createUangKeluar = (data, token) => {
    //
};

export const updateUangMasuk = (id, { data }, token) => {
    //
};

export const updateUangKeluar = (id, { data }, token) => {
    //
};

export const deleteUangMasuk = (id, token) => {
    //
};

export const deleteUangKeluar = (id, token) => {
    //
};
