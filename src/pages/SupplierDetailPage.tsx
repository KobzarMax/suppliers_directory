import { useParams } from "react-router-dom";
import { SupplierDetail } from "@/components/Supplier/SupplierDetail/SupplierDetail";
import BackLink from "@/components/Basic/BackLink/BackLink";

export function SupplierDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid Supplier ID</div>;
  }

  return (
    <div className="supplier-detail-page">
      <BackLink path="/" />
      <SupplierDetail id={id} />
    </div>
  );
}
