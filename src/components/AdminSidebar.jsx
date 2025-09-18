import { FaTachometerAlt, FaTable } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logofik.png"; // <-- import logo

export default function AdminSidebar() {
    return (
        <div className="p-4">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-2 mb-6">
            <img
                src={logo} // pakai variable import
                alt="Logo"
                className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold">Sistem Inaugurasi FIK</h1>
        </div>

        {/* Menu */}
        <ul className="space-y-4">
            <li>
                <Link
                    to="/admin"
                    className="flex items-center space-x-2 hover:text-blue-200"
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/listpeserta"
                    className="flex items-center space-x-2 hover:text-blue-200"
                >
                    <FaTable />
                    <span>Tables</span>
                </Link>
            </li>
        </ul>
        </div>
    );
}