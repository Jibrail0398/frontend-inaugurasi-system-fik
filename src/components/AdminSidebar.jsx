import { FaTachometerAlt, FaTable } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logofik.png";

export default function AdminSidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        {/* Sidebar - Brand */}
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
            <div className="sidebar-brand-icon">
            <img src={logo} alt="Logo" className="img-fluid rounded-circle" style={{ width: "40px" }} />
            </div>
            <div className="sidebar-brand-text mx-3">Sistem Inaugurasi</div>
        </Link>

        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Tables */}
        <li className="nav-item">
            <Link className="nav-link" to="/listpeserta">
            <FaTable className="mr-2" />
            <span>Daftar Peserta</span>
            </Link>
        </li>

        {/* Nav Item - Tables */}
        <li className="nav-item">
            <Link className="nav-link" to="/listpanitia">
            <FaTable className="mr-2" />
            <span>Daftar Panitia</span>
            </Link>
        </li>

        {/* Nav Item - Tables */}
        <li className="nav-item">
            <Link className="nav-link" to="/presensipeserta">
            <FaTable className="mr-2" />
            <span>Daftar Hadir Peserta</span>
            </Link>
        </li>

        {/* Nav Item - Tables */}
        <li className="nav-item">
            <Link className="nav-link" to="/presensipanitia">
            <FaTable className="mr-2" />
            <span>Daftar Hadir Panitia</span>
            </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    );
}