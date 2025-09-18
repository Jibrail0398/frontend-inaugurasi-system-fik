import { Outlet } from "react-router";

const AdminAuthLayout = () => {
    return (
        <div className="bg-gradient-primary min-vh-100">
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-6 mx-auto">
                                <div className="card o-hidden border-0 shadow-lg my-5">
                                    <div className="card-body p-0">
                                        <div className="p-5">
                                            <Outlet />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAuthLayout;
