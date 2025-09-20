import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const IsLoginMiddleware = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/admin/auth/login");
        }
    }, [user]);
    return <>{children}</>;
};

export default IsLoginMiddleware;
