import { useState, useEffect, useCallback } from "react";
import { getUserCurrent } from "../services/userService";
import { useLocalStorage } from "react-use";
import * as authService from "../services/authService";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useLocalStorage("token");

    // Cek apakah user sudah login (token ada)
    useEffect(() => {
        if (token) {
            const user = getUserCurrent(token);
            // misalnya decode token atau fetch data user
            setUser(user);
        }
        setLoading(false);
    }, []);

    /**
     * Fungsi login
     * @returns {Promise<string?>} token
     */
    const login = useCallback(async (credentials, remember) => {
        const tokenResponse = await authService.login(credentials, remember);

        if (!tokenResponse) {
            return null;
        }

        setToken(tokenResponse);
        return tokenResponse;
    }, []);

    // Fungsi logout
    const logout = useCallback(() => {
        authService.logout(token);
        setUser(null);
        setToken(null);
    }, []);

    return { user, loading, login, logout, isAuthenticated: !!user };
};

export default useAuth;
