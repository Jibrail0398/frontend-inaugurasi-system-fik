import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DaftarPeserta from "./pages/admin/DaftarPeserta";
import DaftarPanitia from "./pages/admin/DaftarPanitia";
import DaftarHadirPeserta from "./pages/admin/DaftarHadirPeserta";
import DaftarHadirPanitia from "./pages/admin/DaftarHadirPanitia";

function Dashboard() {
  return (
    <div className="row">

      {/* Card Example - Earnings (Monthly) */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Total Peserta
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">123</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-users fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Example - Pending Requests */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Belum Lunas
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">8</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-exclamation-circle fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example Content */}
      <div className="col-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Selamat Datang</h6>
          </div>
          <div className="card-body">
            <p>Ini adalah halaman dashboard Sistem Inaugurasi FIK berbasis SB Admin 2.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="listpeserta" element={<DaftarPeserta />} />
          <Route path="listpanitia" element={<DaftarPanitia />} />
          <Route path="presensipeserta" element={<DaftarHadirPeserta />} />
          <Route path="presensipanitia" element={<DaftarHadirPanitia />} />
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;