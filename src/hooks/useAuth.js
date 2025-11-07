import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "react-use";
import * as authService from "../services/authService";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useLocalStorage("token");

  /**
   * Fungsi login
   * @param {object} credentials - { nim, password }
   * @param {boolean} remember - simpan token di localStorage
   */
  const login = useCallback(
    async (credentials, remember = false) => {
      const response = await authService.login(credentials);

      if (!response.success) {
        throw new Error(response.message);
      }

      // Simpan token apa adanya dari backend
      setToken(response.token);
      setUser(response.user);

      // Jika ingin implementasi "remember me", bisa pakai cookie/session
      // Saat ini token tetap di localStorage
    },
    [setToken]
  );

  /**
   * Fungsi logout
   */
  const logout = useCallback(async () => {
    if (token) {
      try {
        await authService.logout(token);
      } catch (error) {
        console.warn("Logout gagal:", error.message);
      }
    }

    setUser(null);
    setToken(null);
    window.location.href = "/admin/auth/login"; // redirect ke login setelah logout
  }, [token, setToken]);

  /**
   * Auto-fetch user saat token berubah
   */
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.user(token);
        setUser(response.user);
      } catch (error) {
        console.warn("Token invalid atau expired:", error.message);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, setToken]);

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    token,
  };
};

export default useAuth;
