import { useCallback, useEffect, useState } from "react";
import * as keuanganService from "../services/keuanganService";
import { useLocalStorage } from "react-use";

const useUangKeluar = () => {
    const [loading, setLoading] = useState();
    const [token, _] = useLocalStorage("token");
    const [uangKeluars, setUangKeluars] = useState([]);

    const getAll = useCallback(async () => {
        setLoading(true);
        try {
            const response = await keuanganService.getAllUangKeluar(token);
            setUangKeluars(response.data);
        } catch (error) {
            setUangKeluars(response.data);
        } finally {
            setLoading(false);
        }
    }, []);

    const create = useCallback(async (data) => {
        keuanganService.createUangKeluar(data, token);
    }, []);

    useEffect(() => {}, []);
    return { loading, uangKeluars, create };
};

export default useUangKeluar;
