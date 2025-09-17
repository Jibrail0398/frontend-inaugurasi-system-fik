import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import LoginPage from "./pages/admin/LoginPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "forgot-password",
                element: <>7</>,
            },
        ],
    },
]);

export default router;
