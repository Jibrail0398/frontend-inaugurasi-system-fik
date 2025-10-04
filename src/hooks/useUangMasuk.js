import { useCallback, useEffect, useState } from "react";
import * as keuanganService from "../services/keuanganService";
import { useLocalStorage } from "react-use";

const useUangMasuk = () => {
    const [loading, setLoading] = useState(true);
    const [uangMasuk, setUangMasuk] = useState([]);
    const [token, _] = useLocalStorage("token");

    const getAll = useCallback(async () => {
        setLoading(true);

        const response = await keuanganService.getAllUangMasuk(token);
        setUangMasuk(response.data);

        setLoading(false);
    }, []);

    const getById = useCallback(async (id) => {
        // Fetch by ID logic here
        return uangMasuk.find((item) => item.id === id);
    }, []);

    const create = useCallback(async (data) => {
        keuanganService.createUangMasuk(data, token);
    }, []);

    const update = useCallback(async (id, data) => {
        // Update data logic here
    });

    const deleteById = useCallback(async (id) => {
        // Delete data logic here
    });

    useEffect(() => {
        getAll();
    }, []);

    return { loading, uangMasuk, getAll, getById, create, update, deleteById };
};

export default useUangMasuk;
