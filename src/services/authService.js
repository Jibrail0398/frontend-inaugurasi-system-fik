import axios from "axios";

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

/**
 * User login
 * @param {{nim: string, password: string}} credentials
 * @param {boolean} remember
 * @returns {Promise<Object>} token
 */
export const login = async ({ nim, password }, remember) => {
    const response = await axios.post(`${BASE_URL_API}/login`, { nim, password });
    return response.data;
};

/**
 * User logout
 * @param {string} token
 * @returns {boolean} success
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

    return true;
};

/**
 * Get current user
 * @param {string} token
 * @returns {Promise<Object>} user
 */
export const user = async (token) => {
    // const response = await axios.get(`${BASE_URL_API}/user`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // });
    // return response.data;
};
