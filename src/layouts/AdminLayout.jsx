import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div id="wrapper" className="d-flex">
        {/* Sidebar */}
        <div
            className={`bg-gradient-primary sidebar sidebar-dark accordion ${
            isSidebarOpen ? "toggled" : ""
            }`}
        >
            <AdminSidebar />
        </div>

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column flex-grow-1">
            {/* Main Content */}
            <div id="content">
            <AdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="container-fluid">
                <Outlet />
            </div>
            </div>

            {/* Footer */}
            <AdminFooter />
        </div>
        </div>
    );
}