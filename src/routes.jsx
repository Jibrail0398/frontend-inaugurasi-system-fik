import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/admin/auth/LoginPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import AdminAuthLayout from "./layouts/AdminAuthLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import EventPage from "./pages/admin/event/EventPage.jsx";
import TestPage from "./pages/TestPage.jsx";

const router = createBrowserRouter([
    {
        path: "/admin/auth",
        element: <AdminAuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "events",
                element: <EventPage />,
            },
        ],
    },
    {
        path: "/test",
        element: <TestPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;
