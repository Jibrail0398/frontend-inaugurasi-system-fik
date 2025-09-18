const NavbarAdmin = () => {
    return (
        <nav className="layout-navbar navbar navbar-expand-xl align-items-center" id="layout-navbar">
            <div className="container-xxl">
                <div className="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4 ms-0">
                    <a href="index.html" className="app-brand-link">
                        <span className="app-brand-logo demo">
                            <span className="text-primary">
                                <svg width={32} height={22} viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                                        fill="currentColor"
                                    />
                                    <path opacity="0.06" fillRule="evenodd" clipRule="evenodd" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616" />
                                    <path opacity="0.06" fillRule="evenodd" clipRule="evenodd" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="currentColor" />
                                </svg>
                            </span>
                        </span>
                        <span className="app-brand-text demo menu-text fw-bold text-heading">Vuexy</span>
                    </a>
                    <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
                        <i className="icon-base ti tabler-x icon-sm d-flex align-items-center justify-content-center" />
                    </a>
                </div>
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
                        <i className="icon-base ti tabler-menu-2 icon-md" />
                    </a>
                </div>
                <div className="navbar-nav-right d-flex align-items-center justify-content-end" id="navbar-collapse">
                    <ul className="navbar-nav flex-row align-items-center ms-md-auto">
                        {/* Search */}
                        <li className="nav-item navbar-search-wrapper btn btn-text-secondary btn-icon rounded-pill">
                            <a className="nav-item nav-link search-toggler px-0" href="javascript:void(0);">
                                <span className="d-inline-block text-body-secondary fw-normal" id="autocomplete" />
                            </a>
                        </li>
                        {/* /Search */}
                        <li className="nav-item dropdown-language dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill" href="javascript:void(0);" data-bs-toggle="dropdown">
                                <i className="icon-base ti tabler-language icon-22px text-heading" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item" href="javascript:void(0);" data-language="en" data-text-direction="ltr">
                                        <span>English</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="javascript:void(0);" data-language="fr" data-text-direction="ltr">
                                        <span>French</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="javascript:void(0);" data-language="ar" data-text-direction="rtl">
                                        <span>Arabic</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="javascript:void(0);" data-language="de" data-text-direction="ltr">
                                        <span>German</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        {/*/ Language */}
                        {/* Style Switcher */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill" id="nav-theme" href="javascript:void(0);" data-bs-toggle="dropdown">
                                <i className="icon-base ti tabler-sun icon-22px theme-icon-active text-heading" />
                                <span className="d-none ms-2" id="nav-theme-text">
                                    Toggle theme
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="nav-theme-text">
                                <li>
                                    <button type="button" className="dropdown-item align-items-center active" data-bs-theme-value="light" aria-pressed="false">
                                        <span>
                                            <i className="icon-base ti tabler-sun icon-22px me-3" data-icon="sun" />
                                            Light
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item align-items-center" data-bs-theme-value="dark" aria-pressed="true">
                                        <span>
                                            <i className="icon-base ti tabler-moon-stars icon-22px me-3" data-icon="moon-stars" />
                                            Dark
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item align-items-center" data-bs-theme-value="system" aria-pressed="false">
                                        <span>
                                            <i className="icon-base ti tabler-device-desktop-analytics icon-22px me-3" data-icon="device-desktop-analytics" />
                                            System
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                        {/* / Style Switcher*/}
                        {/* Quick links  */}
                        <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <i className="icon-base ti tabler-layout-grid-add icon-22px text-heading" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end p-0">
                                <div className="dropdown-menu-header border-bottom">
                                    <div className="dropdown-header d-flex align-items-center py-3">
                                        <h6 className="mb-0 me-auto">Shortcuts</h6>
                                        <a href="javascript:void(0)" className="dropdown-shortcuts-add py-2 btn btn-text-secondary rounded-pill btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Add shortcuts">
                                            <i className="icon-base ti tabler-plus icon-20px text-heading" />
                                        </a>
                                    </div>
                                </div>
                                <div className="dropdown-shortcuts-list scrollable-container">
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                                <i className="icon-base ti tabler-calendar icon-26px text-heading" />
                                            </span>
                                            <a href="app-calendar.html" className="stretched-link">
                                                Calendar
                                            </a>
                                            <small>Appointments</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                                <i className="icon-base ti tabler-file-dollar icon-26px text-heading" />
                                            </span>
                                            <a href="app-invoice-list.html" className="stretched-link">
                                                Invoice App
                                            </a>
                                            <small>Manage Accounts</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                                <i className="icon-base ti tabler-user icon-26px text-heading" />
                                            </span>
                                            <a href="app-user-list.html" className="stretched-link">
                                                User App
                                            </a>
                                            <small>Manage Users</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                                <i className="icon-base ti tabler-users icon-26px text-heading" />
                                            </span>
                                            <a href="app-access-roles.html" className="stretched-link">
                                                Role Management
                                            </a>
                                            <small>Permission</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                                <i className="icon-base ti tabler-device-desktop-analytics icon-26px text-heading" />
                                            </span>
                                            <a href="index.html" className="stretched-link">
                                                Dashboard
                                            </a>
                                            <small>User Dashboard</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                                <i className="icon-base ti tabler-settings icon-26px text-heading" />
                                            </span>
                                            <a href="pages-account-settings-account.html" className="stretched-link">
                                                Setting
                                            </a>
                                            <small>Account Settings</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                                <i className="icon-base ti tabler-help-circle icon-26px text-heading" />
                                            </span>
                                            <a href="pages-faq.html" className="stretched-link">
                                                FAQs
                                            </a>
                                            <small>FAQs &amp; Articles</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                                                <i className="icon-base ti tabler-square icon-26px text-heading" />
                                            </span>
                                            <a href="modal-examples.html" className="stretched-link">
                                                Modals
                                            </a>
                                            <small>Useful Popups</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        {/* Quick links */}
                        {/* Notification */}
                        <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
                            <a className="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <span className="position-relative">
                                    <i className="icon-base ti tabler-bell icon-22px text-heading" />
                                    <span className="badge rounded-pill bg-danger badge-dot badge-notifications border" />
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end p-0">
                                <li className="dropdown-menu-header border-bottom">
                                    <div className="dropdown-header d-flex align-items-center py-3">
                                        <h6 className="mb-0 me-auto">Notification</h6>
                                        <div className="d-flex align-items-center h6 mb-0">
                                            <span className="badge bg-label-primary me-2">8 New</span>
                                            <a href="javascript:void(0)" className="dropdown-notifications-all p-2 btn btn-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Mark all as read">
                                                <i className="icon-base ti tabler-mail-opened text-heading" />
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="dropdown-notifications-list scrollable-container">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <img src="../../assets/img/avatars/1.png" alt="" className="rounded-circle" />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="small mb-1">Congratulation Lettie 🎉</h6>
                                                    <small className="mb-1 d-block text-body">Won the monthly best seller gold badge</small>
                                                    <small className="text-body-secondary">1h ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <span className="avatar-initial rounded-circle bg-label-danger">CF</span>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 small">Charles Franklin</h6>
                                                    <small className="mb-1 d-block text-body">Accepted your connection</small>
                                                    <small className="text-body-secondary">12hr ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <img src="../../assets/img/avatars/2.png" alt="" className="rounded-circle" />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 small">New Message ✉️</h6>
                                                    <small className="mb-1 d-block text-body">You have new message from Natalie</small>
                                                    <small className="text-body-secondary">1h ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <span className="avatar-initial rounded-circle bg-label-success">
                                                            <i className="icon-base ti tabler-shopping-cart" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 small">Whoo! You have new order 🛒</h6>
                                                    <small className="mb-1 d-block text-body">ACME Inc. made new order $1,154</small>
                                                    <small className="text-body-secondary">1 day ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <img src="../../assets/img/avatars/9.png" alt="" className="rounded-circle" />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 small">Application has been approved 🚀</h6>
                                                    <small className="mb-1 d-block text-body">Your ABC project application has been approved.</small>
                                                    <small className="text-body-secondary">2 days ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <span className="avatar-initial rounded-circle bg-label-success">
                                                            <i className="icon-base ti tabler-chart-pie" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 small">Monthly report is generated</h6>
                                                    <small className="mb-1 d-block text-body">July monthly financial report is generated </small>
                                                    <small className="text-body-secondary">3 days ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <img src="../../assets/img/avatars/5.png" alt="" className="rounded-circle" />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 small">Send connection request</h6>
                                                    <small className="mb-1 d-block text-body">Peter sent you connection request</small>
                                                    <small className="text-body-secondary">4 days ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <img src="../../assets/img/avatars/6.png" alt="" className="rounded-circle" />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 small">New message from Jane</h6>
                                                    <small className="mb-1 d-block text-body">Your have new message from Jane</small>
                                                    <small className="text-body-secondary">5 days ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar">
                                                        <span className="avatar-initial rounded-circle bg-label-warning">
                                                            <i className="icon-base ti tabler-alert-triangle" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 small">CPU is running high</h6>
                                                    <small className="mb-1 d-block text-body">CPU Utilization Percent is currently at 88.63%,</small>
                                                    <small className="text-body-secondary">5 days ago</small>
                                                </div>
                                                <div className="flex-shrink-0 dropdown-notifications-actions">
                                                    <a href="javascript:void(0)" className="dropdown-notifications-read">
                                                        <span className="badge badge-dot" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="dropdown-notifications-archive">
                                                        <span className="icon-base ti tabler-x" />
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className="border-top">
                                    <div className="d-grid p-4">
                                        <a className="btn btn-primary btn-sm d-flex" href="javascript:void(0);">
                                            <small className="align-middle">View all notifications</small>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        {/*/ Notification */}
                        {/* User */}
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow p-0" href="javascript:void(0);" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img src="../../assets/img/avatars/1.png" alt="" className="rounded-circle" />
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item mt-0" href="pages-account-settings-account.html">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2">
                                                <div className="avatar avatar-online">
                                                    <img src="../../assets/img/avatars/1.png" alt="" className="rounded-circle" />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0">John Doe</h6>
                                                <small className="text-body-secondary">Admin</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider my-1 mx-n2" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="pages-profile-user.html">
                                        <i className="icon-base ti tabler-user me-3 icon-md" />
                                        <span className="align-middle">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="pages-account-settings-account.html">
                                        <i className="icon-base ti tabler-settings me-3 icon-md" />
                                        <span className="align-middle">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="pages-account-settings-billing.html">
                                        <span className="d-flex align-items-center align-middle">
                                            <i className="flex-shrink-0 icon-base ti tabler-file-dollar me-3 icon-md" />
                                            <span className="flex-grow-1 align-middle">Billing</span>
                                            <span className="flex-shrink-0 badge bg-danger d-flex align-items-center justify-content-center">4</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider my-1 mx-n2" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="pages-pricing.html">
                                        <i className="icon-base ti tabler-currency-dollar me-3 icon-md" />
                                        <span className="align-middle">Pricing</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="pages-faq.html">
                                        <i className="icon-base ti tabler-question-mark me-3 icon-md" />
                                        <span className="align-middle">FAQ</span>
                                    </a>
                                </li>
                                <li>
                                    <div className="d-grid px-2 pt-2 pb-1">
                                        <a className="btn btn-sm btn-danger d-flex" href="auth-login-cover.html" target="_blank">
                                            <small className="align-middle">Logout</small>
                                            <i className="icon-base ti tabler-logout ms-2 icon-14px" />
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        {/*/ User */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarAdmin;
