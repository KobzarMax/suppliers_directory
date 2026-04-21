import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/Header/Header";

const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const CreateSupplierPage = lazy(() => import("./pages/CreateSupplierPage").then(m => ({ default: m.CreateSupplierPage })));
const SupplierDetailPage = lazy(() => import("./pages/SupplierDetailPage").then(m => ({ default: m.SupplierDetailPage })));

export function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Suspense fallback={<div className="loading-state">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/suppliers/new" element={<CreateSupplierPage />} />
            <Route path="/suppliers/:id" element={<SupplierDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
