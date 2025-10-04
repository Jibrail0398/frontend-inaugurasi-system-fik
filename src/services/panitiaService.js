/**
 * @typedef CreatePanitiaRequest
 */

/**
 * @typedef UpdatePanitiaRequest
 */

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

/**
 * Ambil semua panitia
 * @param {string} token Token authorisasi
 */
export const getAll = async (token) => {
    const response = await axios.get(`${BASE_URL_API}/pendaftaran-panitia/index`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Mendaftarkan Panitia
 * @param {string} kodeEvent Kode Event
 * @param {CreatePanitiaRequest} data
 * @param {string} token Token authorisasi
 */
export const create = async (kodeEvent, data, token) => {
    const response = await axios.post(`${BASE_URL_API}/pendaftaran-panitia/${kodeEvent}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Update Panitia berdasarkan ID
 * @param {string} id ID Panitia
 * @param {UpdatePanitiaRequest} data
 * @param {string} token Token authorisasi
 */
export const updateById = async (id, data, token) => {
    const response = await axios.put(`${BASE_URL_API}/panitia/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Hapus Panitia berdasarkan ID
 * @param {string} id ID Panitia
 * @param {string} token Token authorisasi
 */
export const deleteById = async (id, token) => {
    const response = await axios.delete(`${BASE_URL_API}/panitia/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
