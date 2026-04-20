import { useSupplier } from "../hooks/useSuppliers";

interface SupplierDetailProps {
  id: string;
}

export function SupplierDetail({ id }: SupplierDetailProps) {
  const { data: supplier, isLoading, isError, error } = useSupplier(id);

  if (isLoading) {
    return <div className="loading-state">Loading supplier details...</div>;
  }

  if (isError) {
    return (
      <div className="error-state">
        Error: {error instanceof Error ? error.message : "Failed to load supplier details"}
      </div>
    );
  }

  if (!supplier) {
    return <div className="empty-state">Supplier not found.</div>;
  }

  return (
    <div className="supplier-detail-container">
      <h2>{supplier.name}</h2>
      
      <div className="detail-grid">
        <div className="detail-item">
          <span className="label">Registration Number:</span>
          <span className="value">{supplier.registrationNumber}</span>
        </div>
        
        <div className="detail-item">
          <span className="label">Country:</span>
          <span className="value">{supplier.country}</span>
        </div>
        
        <div className="detail-item">
          <span className="label">Compliance Status:</span>
          <span className={`value status-badge status-${supplier.complianceStatus.toLowerCase()}`}>
            {supplier.complianceStatus}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="label">Created At:</span>
          <span className="value">{new Date(supplier.createdAt).toLocaleString()}</span>
        </div>
        
        <div className="detail-item full-width">
          <span className="label">Categories:</span>
          <div className="categories-list">
            {supplier.categories.map((category) => (
              <span key={category} className="category-tag">
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
