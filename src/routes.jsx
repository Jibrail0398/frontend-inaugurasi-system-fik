import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/admin/auth/LoginPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import AdminAuthLayout from "./layouts/AdminAuthLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import EventPage from "./pages/admin/event/EventPage.jsx";
import DaftarPanitia from "./pages/admin/DaftarPanitia.jsx";
import DaftarPeserta from "./pages/admin/DaftarPeserta.jsx";
import DaftarHadirPeserta from "./pages/admin/DaftarHadirPeserta.jsx";
import DaftarHadirPanitia from "./pages/admin/DaftarHadirPanitia.jsx";
import FormPeserta from "./pages/FormPeserta";
import FormPanitia from "./pages/FormPanitia";
import FormPresensi from "./pages/FormPresensi";
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
            {
                path: "listpeserta",
                element: <DaftarPeserta/>
            },
            {
                path: "listpanitia",
                element: <DaftarPanitia/>
            },
            {
                path: "presensipeserta",
                element: <DaftarHadirPeserta/>
            },
            {
                path: "presensipanitia",
                element: <DaftarHadirPanitia/>
            },
        ],
    },
    {
        path: "/pendaftaranPeserta/:kodeEvent",
        element: <FormPeserta />,
    },
    {
        path: "/pendaftaranPanitia/:kodeEvent",
        element: <FormPanitia />,
    },
    {
        path: "/presensi",
        element: <FormPresensi />,
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