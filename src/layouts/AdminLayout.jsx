import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/img/favicon/favicon.ico";
import "../assets/vendor/fonts/iconify-icons.css";
import "../assets/vendor/libs/node-waves/node-waves.css";
import "../assets/vendor/libs/pickr/pickr-themes.css";
import "../assets/vendor/css/core.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/@form-validation/form-validation.css";
import "../assets/vendor/css/pages/page-auth.css";

import { Outlet } from "react-router";

const AdminLayout = ({ children }) => {
    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner py-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
