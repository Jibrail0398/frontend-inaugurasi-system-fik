import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "react-use";
import * as authService from "../services/authService";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useLocalStorage("token");

    /**
     * Fungsi login
     * @returns {Promise<void> | Promise<never>}
     */
    const login = useCallback(async (credentials, remember) => {
        const response = await authService.login(credentials);

        if (!response.success) {
            throw new Error(response.message);
        }

        const tokenResponse = response.token.split(" ")[1];

        setToken(tokenResponse);
        setUser(response.user);
    }, []);

    // Fungsi logout
    const logout = useCallback(() => {
        authService.logout(token);
        setUser(null);
        setToken(null);
    }, []);

    // Cek apakah user sudah login (token ada)
    useEffect(() => {
        (async () => {
            try {
                const response = await authService.user(token ?? "");

                setUser(response.user);
                setLoading(false);
            } catch (error) {
                setUser(null);
                setToken(null);
                setLoading(false);
            }
        })();
    }, []);

    return { user, loading, login, logout, isAuthenticated: !!user, token };
};

export default useAuth;
