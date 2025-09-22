import axios from "axios";

const BASE_URL_API = "http://192.168.5.220:5173/api-test";

export const getKeuangan = async (token) => {
    return;
};

export const getAllUangMasuk = async () => {
    const response = await axios.get(`${BASE_URL_API}/uang-masuk/get/success.json`);
    return response.data;
};

export const getAllUangKeluar = (token) => {
    //
};

export const createUangMasuk = (data, token) => {
    //
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
