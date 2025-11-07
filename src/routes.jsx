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
import PresensiRolePage from "./pages/PresensiRolePage.jsx";
import FormSertifikat from "./pages/admin/Sertifikat/SertifikatPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import ComingSoonPage from "./pages/ComingSoonPage.jsx";
import NotLoginMiddleware from "./components/middlewares/NotLoginMiddleware.jsx";
import IsLoginMiddleware from "./components/middlewares/IsLoginMiddleware.jsx";
import UangMasukPage from "./pages/admin/keuangan/uang-masuk/UangMasukPage.jsx";
import LaporanKeuanganPage from "./pages/admin/keuangan/laporan/LaporanKeuanganPage.jsx";
import UangKeluarPage from "./pages/admin/keuangan/uang-keluar/UangKeluarPage.jsx";
import CheckEventCode from "./components/middlewares/CheckEventCode";
import Dokumentasi from "./pages/admin/Dokumentasi/Dokumentasi.jsx";

import LandingPage from "./pages/LandingPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
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
    element: (
      <IsLoginMiddleware>
        <AdminLayout />
      </IsLoginMiddleware>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <ComingSoonPage />,
      },
      {
        path: "events",
        element: <EventPage />,
      },
      {
        path: "keuangan",
        children: [
          {
            path: "uang-masuk",
            element: <UangMasukPage />,
          },
          {
            path: "uang-keluar",
            element: <UangKeluarPage />,
          },
          {
            path: "laporan",
            element: <LaporanKeuanganPage />,
          },
        ],
      },
      {
        path: "listpeserta",
        element: <DaftarPeserta />,
      },
      {
        path: "listpanitia",
        element: <DaftarPanitia />,
      },
      {
        path: "presensipeserta",
        element: <DaftarHadirPeserta />,
      },
      {
        path: "presensipanitia",
        element: <DaftarHadirPanitia />,
      },
      {
        path: "dokumentasi",
        element: <Dokumentasi />,
      },

      {
        path: "sertifikat",
        element: <FormSertifikat />,
      },
    ],
  },
  {
    path: "/pendaftaranPeserta/:kodeEvent",
    loader: CheckEventCode,
    errorElement: <NotFoundPage />,
    element: <FormPeserta />,
  },
  {
    path: "/pendaftaranPanitia/:kodeEvent",
    loader: CheckEventCode,
    errorElement: <NotFoundPage />,
    element: <FormPanitia />,
  },
  {
    path: "/presensi-role",
    element: <PresensiRolePage />,
  },
  {
    path: "/presensi",
    element: <FormPresensi />,
  },
  {
    path: "/presensi/:kodeEvent",
    element: <FormPresensi />,
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
