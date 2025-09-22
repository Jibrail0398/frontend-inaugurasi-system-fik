import axios from "axios";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
let BASE_URL_API;

if (ENVIRONMENT !== "production") {
    BASE_URL_API = " http://192.168.5.220:5173/api-test";
} else {
    BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
}

/**
 * User login
 * @param {{nim: string, password: string}} credentials
 * @param {boolean} remember
 * @returns {Promise<Object>} token
 */
export const login = async ({ nim, password }, remember) => {
    let response;

    if (ENVIRONMENT === "production") {
        response = await axios.post(`${BASE_URL_API}/login`, { nim, password });
    } else {
        let url;

        if (password === "benar") {
            url = `${BASE_URL_API}/login/success.json`;
        } else {
            url = `${BASE_URL_API}/login/failed.json`;
        }

        response = await axios.post(url, { nim, password, remember });
    }
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
    let response;

    if (ENVIRONMENT === "production") {
        response = await axios.get(`${BASE_URL_API}/profile/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        response = await axios.get(`${BASE_URL_API}/profile/me/success.json`);
    }

    return response.data;
};
