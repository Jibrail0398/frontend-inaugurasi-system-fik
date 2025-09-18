import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import LoginPage from "./pages/admin/LoginPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin/login",
        element: <LoginPage />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
        ],
    },
]);

export default router;
