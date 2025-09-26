import axios from "axios";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export const getEvents = async (token) => {
    const response = await axios.get(`${BASE_URL_API}/events`);
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
