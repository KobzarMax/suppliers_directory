import { Link } from "react-router-dom";
import { useSuppliers } from "../hooks/useSuppliers";

interface SupplierListProps {
  query: string;
}

export function SupplierList({ query }: SupplierListProps) {
  const { data: suppliers, isLoading, isError, error } = useSuppliers(query);

  if (isLoading) {
    return <div className="loading-state">Loading suppliers...</div>;
  }

  if (isError) {
    return (
      <div className="error-state">
        Error: {error instanceof Error ? error.message : "Failed to load suppliers"}
      </div>
    );
  }

  if (!suppliers || suppliers.length === 0) {
    return <div className="empty-state">No suppliers found.</div>;
  }

  return (
    <div className="table-container">
      <table className="supplier-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Categories</th>
            <th>Compliance Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.country}</td>
              <td>{supplier.categories.join(", ")}</td>
              <td>
                <span className={`status-badge status-${supplier.complianceStatus.toLowerCase()}`}>
                  {supplier.complianceStatus}
                </span>
              </td>
              <td>{new Date(supplier.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/suppliers/${supplier.id}`} className="view-link">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
