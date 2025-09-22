import { Link, useLocation } from "react-router";

/**
 * Item
 * @param {{icon: string, text: string, to: string, active?: boolean}} props
 */
const NavItem = ({ icon, text, to, active = false }) => {
    return (
        <li className={"nav-item" + (active ? " active" : "")}>
            <Link className="nav-link" to={to}>
                <i className={icon} />
                <span>{text}</span>
            </Link>
        </li>
    );
};

/**
 * Item Collapse
 * @param {{heading: string, heading2: string, childs: {text: string, to: string}[], active: boolean, icon: string}} param0
 */
const NavItemCollapse = ({ heading, heading2, childs, active = false, icon }) => {
    return (
        <li className={"nav-item" + (active ? " active" : "")}>
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <i className={icon} />
                <span>{heading}</span>
            </a>
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">{heading2}:</h6>
                    {childs.map((child, index) => (
                        <Link className="collapse-item" to={child.to} key={index}>
                            {child.text}
                        </Link>
                    ))}
                </div>
            </div>
        </li>
    );
};

const SidebarAdmin = ({ show = true }) => {
    const location = useLocation();

    return (
        <ul className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" + (show ? "" : " toggled")} id="accordionSidebar">
            {/* Sidebar - Brand */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">
                    Inaugurasi <sup>FIK</sup>
                </div>
            </Link>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {/* Nav Item - Dashboard */}
            <NavItem icon="fas fa-fw fa-tachometer-alt" text="Dashboard" to="/admin" active={location.pathname === "/admin"} />

            {/* Divider */}
            <hr className="sidebar-divider" />

            {/* Heading */}
            <div className="sidebar-heading">Manajemen</div>

            {/* User */}
            <NavItem icon="fas fa-fw fa-user" text="Users" to="/admin/users" active={location.pathname === "/admin/users"} />

            {/* Event */}
            <NavItem text="Daftar Event" icon="fas fa-fw fa-calendar" to="/admin/events" active={location.pathname === "/admin/events"} />

            <NavItem icon="fas fa-fw fa-coins" text="Keuangan" to="/admin/finance" active={location.pathname === "/admin/finance"} />

            {/* Tambahan dari Sidebar 2 */}
            <NavItem icon="fas fa-fw fa-users" text="Daftar Peserta" to="/admin/listpeserta" active={location.pathname === "/admin/listpeserta"} />

            <NavItem icon="fas fa-fw fa-user-friends" text="Daftar Panitia" to="/admin/listpanitia" active={location.pathname === "/admin/listpanitia"} />

            <NavItem icon="fas fa-fw fa-clipboard-list" text="Daftar Hadir Peserta" to="/admin/presensipeserta" active={location.pathname === "/admin/presensipeserta"} />

            <NavItem icon="fas fa-fw fa-clipboard-check" text="Daftar Hadir Panitia" to="/admin/presensipanitia" active={location.pathname === "/admin/presensipanitia"} />

            {/* Divider */}
            <hr className="sidebar-divider" />
        </ul>
    );
};

export default SidebarAdmin;
