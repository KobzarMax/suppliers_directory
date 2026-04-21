import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import "./SupplierSearch.css";

interface SupplierSearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export function SupplierSearch({ onSearch, initialValue = "" }: SupplierSearchProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const debouncedSearch = React.useMemo(
    () => debounce((query: string) => onSearch(query), 300),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  }, [debouncedSearch]);

  return (
    <div className="search-container">
      <Search className="search-icon" size={18} aria-hidden="true" />
      <input
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={handleChange}
        className="search-input"
        aria-label="Search suppliers by name"
      />
    </div>
  );
}
