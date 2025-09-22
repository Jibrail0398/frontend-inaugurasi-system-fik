import { useCallback, useEffect, useState } from "react";
import * as keuanganService from "../services/keuanganService";

const useUangMasuk = () => {
    const [loading, setLoading] = useState(true);
    const [uangMasuk, setUangMasuk] = useState([]);

    const getAll = useCallback(async () => {
        setLoading(true);

        const response = await keuanganService.getAllUangMasuk();
        setUangMasuk(response.data);

        setLoading(false);
    }, []);

    const getById = useCallback(async (id) => {
        // Fetch by ID logic here
        return uangMasuk.find((item) => item.id === id);
    }, []);

    const create = useCallback(async (data) => {
        // Create data logic here
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
