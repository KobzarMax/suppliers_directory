import { Link } from "react-router-dom";
import { useSuppliers } from "../../../hooks/useSuppliers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFlagEmoji } from "../../../utils/country";
import Spinner from "../../Basic/Spinner/Spinner";
import "./SupplierList.css";

interface SupplierListProps {
  query: string;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function SupplierList({ 
  query, 
  page, 
  limit, 
  onPageChange, 
  onLimitChange 
}: SupplierListProps) {
  const { data, isLoading, isError, error, isPlaceholderData } = useSuppliers(query, page, limit);
  const suppliers = data?.data;
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  if (isLoading && !isPlaceholderData) {
    return <Spinner />;
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
      <div className="table-inner">
        <table className={`supplier-table ${isPlaceholderData ? "loading" : ""}`}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Country</th>
              <th scope="col">Categories</th>
              <th scope="col">Compliance Status</th>
              <th scope="col">Created Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody aria-live="polite">
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td className="country-cell">
                  <span className="flag-emoji" aria-hidden="true">{getFlagEmoji(supplier.country)}</span>
                  <span className="country-code">{supplier.country}</span>
                </td>
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
      <nav className="pagination-footer" aria-label="Suppliers Pagination">
        <div className="pagination-info" aria-live="polite">
          Showing {Math.min((page - 1) * limit + 1, totalCount)} to {Math.min(page * limit, totalCount)} of {totalCount} suppliers
        </div>
        
        <div className="pagination-controls">
            <div className="page-size-selector">
              <label htmlFor="pageSize">Page Size:</label>
              <select 
                id="pageSize" 
                value={limit} 
                onChange={(e) => onLimitChange(Number(e.target.value))}
                aria-label="Change results per page"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            
            <div className="page-nav">
              <button 
                onClick={() => onPageChange(Math.max(1, page - 1))} 
                disabled={page === 1 || isPlaceholderData}
                className="nav-button"
                aria-label="Go to previous page"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="current-page" aria-current="page">Page {page} of {totalPages}</span>
              <button 
                onClick={() => onPageChange(Math.min(totalPages, page + 1))} 
                disabled={page === totalPages || isPlaceholderData}
                className="nav-button"
                aria-label="Go to next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
      </nav>
    </div>
  );
}
