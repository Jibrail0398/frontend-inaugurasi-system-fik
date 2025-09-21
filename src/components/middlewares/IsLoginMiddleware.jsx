import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const IsLoginMiddleware = ({ children }) => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Untuk development, cek token
        if (import.meta.env.VITE_ENVIRONMENT === "development") {
            if (!token) {
                navigate("/admin/auth/login");
            }
        } else {
            // Untuk production, cek user
            if (!user) {
                navigate("/admin/auth/login");
            }
        }
    }, [user]);
    return <>{children}</>;
};

export default IsLoginMiddleware;
