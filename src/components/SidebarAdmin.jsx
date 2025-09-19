import { Link, useLocation, useNavigate } from "react-router";

/**
 *
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

const SidebarAdmin = () => {
    const location = useLocation();

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">
                    SB Admin <sup>2</sup>
                </div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}

            <hr className="sidebar-divider" />

            <NavItem icon="fas fa-fw fa-tachometer-alt" text="Dashboard" to="/admin" active={location.pathname === "/admin"} />

            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">Manajemen</div>

            {/* User */}
            <NavItem icon="fas fa-fw fa-user" text="Users" to="/admin/users" active={location.pathname === "/admin/users"} />

            {/* Event */}
            <NavItem icon="fas fa-fw fa-calendar" text="Events" to="/admin/events" active={location.pathname === "/admin/events"} />

            {/* Divider */}
            <hr className="sidebar-divider" />
        </ul>
    );
};

export default SidebarAdmin;
