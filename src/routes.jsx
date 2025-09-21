import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/admin/auth/LoginPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import AdminAuthLayout from "./layouts/AdminAuthLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import EventPage from "./pages/admin/event/EventPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import ComingSoonPage from "./pages/ComingSoonPage.jsx";
import NotLoginMiddleware from "./components/middlewares/NotLoginMiddleware.jsx";

const router = createBrowserRouter([
    {
        path: "/admin/auth",
        element: (
            <NotLoginMiddleware>
                <AdminAuthLayout />
            </NotLoginMiddleware>
        ),
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
                path: "event-types",
                element: <ComingSoonPage />,
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
        path: "/comingsoon",
        element: <ComingSoonPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;
