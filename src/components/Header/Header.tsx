import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <h1>Supplier Directory</h1>
        </Link>
        <Link 
          to="/suppliers/new" 
          className="add-supplier-btn" 
          title="Add supplier"
          aria-label="Add supplier"
        >
          <Plus size={24} />
        </Link>
      </div>
    </header>
  );
}