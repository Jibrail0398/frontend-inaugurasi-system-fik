/**
 * @typedef Event
 * @property {string} id
 * @property {string} kode_event
 * @property {string} nama_event
 * @property {string} jenis
 * @property {string} tema
 * @property {string} harga_pendaftaran_panitia
 * @property {string} harga_pendaftaran_peserta
 * @property {string} status_pendaftaran_panitia
 * @property {string} status_pendaftaran_peserta
 */

/**
 * @typedef EventUpdateRequest
 * @property {string} kode_event
 * @property {string} nama_event
 * @property {string} jenis
 * @property {string} tema
 * @property {string} harga_pendaftaran_panitia
 * @property {string} harga_pendaftaran_peserta
 * @property {string} status_pendaftaran_panitia
 * @property {string} status_pendaftaran_peserta
 */

import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

/**
 * Get all events
 * @param {string} token
 * @returns {Promise<Object>}
 */
export const getEvents = async (token) => {
    const response = await axios.get(`${BASE_URL_API}/event/index`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Get event by id
 * @param {string} id
 * @param {string} token Bearer Token
 * @returns {Promise<Object>}
 */
export const getEventById = async (id, token) => {
    const response = await axios.get(`${BASE_URL_API}/event/show/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Create
 * @param {Event} data
 * @param {string} token
 * @returns {Promise<Object>}
 */
export const createEvent = async (data, token) => {
    const response = await axios.post(`${BASE_URL_API}/event/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Update
 * @param {string} id Event ID
 * @param {EventUpdateRequest} data
 * @param {string} token
 * @returns {Promise<Object>}
 */
export const updateEvent = async (id, data, token) => {
    const response = await axios.put(`${BASE_URL_API}/event/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/**
 * Delete
 * @param {string} id Event ID
 * @param {string} token
 * @returns {Promise<Object>}
 */
export const deleteEvent = (id, token) => {
    const response = axios.delete(`${BASE_URL_API}/event/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
