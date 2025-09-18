import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
            <AdminSidebar />
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
            {/* Header tetap ada */}
            <header className="sticky top-0 z-50 bg-white shadow">
            <AdminHeader />
            </header>

            {/* Halaman dinamis */}
            <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
            </main>

            {/* Footer */}
            <footer>
            <AdminFooter />
            </footer>
        </div>
        </div>
    );
}