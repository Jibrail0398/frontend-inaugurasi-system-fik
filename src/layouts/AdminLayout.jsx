import { Outlet } from "react-router";
import { useExternalScripts } from "../hooks/useExternalScript";
import SidebarAdmin from "../components/SidebarAdmin";
import TopbarAdmin from "../components/TopbarAdmin";
import FooterAdmin from "../components/FooterAdmin";

const AdminLayout = () => {
    useExternalScripts(["/vendor/chart.js/Chart.min.js", "/js/demo/chart-area-demo.js", "/js/demo/chart-pie-demo.js"], "body");
    return (
        <div id="page-top">
            {/* Page Wrapper */}
            <div id="wrapper">
                <SidebarAdmin />

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        <TopbarAdmin />

                        <div className="container-fluid">
                            <Outlet />
                        </div>

                        <FooterAdmin />
                    </div>
                    {/* End of Main Content */}
                </div>
                {/* End of Content Wrapper */}
            </div>
            {/* End of Page Wrapper */}
        </div>
    );
};

export default AdminLayout;
