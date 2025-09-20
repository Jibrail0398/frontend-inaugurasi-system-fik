import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const NotLoginMiddleware = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/admin");
        }
    }, [user]);
    return <>{children}</>;
};

export default NotLoginMiddleware;
