import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CreateSupplierPage } from "./pages/CreateSupplierPage";
import { SupplierDetailPage } from "./pages/SupplierDetailPage";
import Header from "@/components/Header/Header";

export function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/suppliers/new" element={<CreateSupplierPage />} />
          <Route path="/suppliers/:id" element={<SupplierDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
