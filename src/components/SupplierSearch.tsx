import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}
