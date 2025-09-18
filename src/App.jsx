import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DaftarPeserta from "./pages/admin/DaftarPeserta";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<h2>📊 Dashboard</h2>} />
          <Route path="listpeserta" element={<DaftarPeserta />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;