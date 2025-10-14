import axios from "axios";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
let BASE_URL_API;

if (ENVIRONMENT !== "production") {
    BASE_URL_API = " http://192.168.5.220:5173/api-test";
} else {
    BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
}

export const getEvents = async (token) => {
    if (ENVIRONMENT === "production") {
        return await axios.get(`${BASE_URL_API}/events`);
    } else {
        const response = await axios.get(`${BASE_URL_API}/events/get/success.json`);
        return response.data;
    }
};

export const getEventById = (id, token) => {
    return {};
};

export const createEvent = ({}, token) => {
    return {};
};

export const updateEvent = ({ id, title, date, description }, token) => {
    return {};
};

export const deleteEvent = (id, token) => {
    return {};
};
