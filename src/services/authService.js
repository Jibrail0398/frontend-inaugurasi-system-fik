/**
 * @typedef CredentialsRequest
 * @property {string} nim
 * @property {string} password
 */

import axios from "axios";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

/**
 * User login
 * @param {CredentialsRequest} credentials
 * @returns {Promise<Object>} Response
 */
export const login = async (data) => {
    const response = await axios.post(`${BASE_URL_API}/login`, data);
    return response.data;
};

/**
 * User logout
 * @param {string} token
 * @returns {Promise<Object>} success
 */
export const logout = async () => {
    const response = await axios.post(
        `${BASE_URL_API}/logout`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data?.success ?? false;
};

/**
 * Get current user
 * @param {string} token
 * @returns {Promise<Object>} user
 */
export const user = async (token) => {
    const response = await axios.get(`${BASE_URL_API}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
