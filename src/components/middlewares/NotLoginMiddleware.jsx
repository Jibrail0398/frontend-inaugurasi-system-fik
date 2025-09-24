import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const NotLoginMiddleware = ({ children }) => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Untuk development, cek token
        if (import.meta.env.VITE_ENVIRONMENT === "development") {
            if (token) {
                navigate("/admin");
                return;
            }
        } else {
            // Untuk production, cek user
            if (user) {
                navigate("/admin");
            }
        }
    }, [user]);
    return <>{children}</>;
};

export default NotLoginMiddleware;
