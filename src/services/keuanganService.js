import axios from "axios";

const BASE_URL_API = "http://localhost:5173/api-test";

export const getKeuangan = () => {};

export const getAllUangMasuk = async () => {
    const response = await axios.get(`${BASE_URL_API}/uang-masuk/get/success.json`);
    return response.data;
};

export const getAllUangKeluar = () => {
    //
};

export const createUangMasuk = (data) => {
    //
};

export const createUangKeluar = (data) => {
    //
};

export const updateUangMasuk = (id, data) => {
    //
};

export const updateUangKeluar = (id, data) => {
    //
};

export const deleteUangMasuk = (id) => {
    //
};

export const deleteUangKeluar = (id) => {
    //
};
