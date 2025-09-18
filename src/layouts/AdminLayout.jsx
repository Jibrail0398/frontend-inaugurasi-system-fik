import { Outlet } from "react-router";
import NavbarAdmin from "../components/NavbarAdmin";

const AdminLayout = () => {
    return (
        <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
            <div className="layout-container">
                <NavbarAdmin />

                <Outlet />

                <div className="layout-overlay layout-menu-toggle" />
                <div className="drag-target" />
            </div>
        </div>
    );
};

export default AdminLayout;
