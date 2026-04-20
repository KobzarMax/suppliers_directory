import { useParams, Link } from "react-router-dom";
import { SupplierDetail } from "../components/SupplierDetail";

export function SupplierDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid Supplier ID</div>;
  }

  return (
    <div className="supplier-detail-page">
      <Link to="/" className="back-link">
        &larr; Back to Directory
      </Link>
      <SupplierDetail id={id} />
    </div>
  );
}
