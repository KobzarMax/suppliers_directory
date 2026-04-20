import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SupplierSearch } from "@/components/SupplierSearch";
import { SupplierList } from "@/components/SupplierList";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ q: query }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <div className="home-page">
      <div className="actions-bar">
        <SupplierSearch onSearch={handleSearch} initialValue={queryParam} />
      </div>
      <SupplierList query={searchQuery} />
    </div>
  );
}

