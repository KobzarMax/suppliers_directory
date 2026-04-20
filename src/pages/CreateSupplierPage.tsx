import { useNavigate } from "react-router-dom";
import { SupplierForm } from "../components/SupplierForm";

export function CreateSupplierPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="create-supplier-page">
      <h2>Add New Supplier</h2>
      <SupplierForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}
