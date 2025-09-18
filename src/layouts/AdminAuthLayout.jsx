import { Outlet } from "react-router";

const AdminAuthLayout = ({ children }) => {
    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner py-6">
                    <Outlet />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminAuthLayout;
