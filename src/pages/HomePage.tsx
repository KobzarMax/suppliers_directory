import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SupplierSearch } from "@/components/Supplier/SupplierSearch/SupplierSearch";
import { SupplierList } from "@/components/Supplier/SupplierList/SupplierList";
import { usePrefetchSuppliers } from "@/hooks/useSuppliers";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const limitParam = parseInt(searchParams.get("limit") || "10", 10);

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const prefetchNextPage = usePrefetchSuppliers(searchQuery, pageParam + 1, limitParam);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    prefetchNextPage();
  }, [prefetchNextPage]);

  const updateParams = (newParams: Record<string, string>) => {
    const current = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...current, ...newParams }, { replace: true });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      updateParams({ q: query, page: "1" });
    } else {
      const current = Object.fromEntries(searchParams.entries());
      delete current.q;
      setSearchParams({ ...current, page: "1" }, { replace: true });
    }
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  const handleLimitChange = (limit: number) => {
    updateParams({ limit: limit.toString(), page: "1" });
  };

  return (
    <div className="home-page">
      <div className="actions-bar">
        <SupplierSearch onSearch={handleSearch} initialValue={queryParam} />
      </div>
      <SupplierList 
        query={searchQuery} 
        page={pageParam} 
        limit={limitParam}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}

