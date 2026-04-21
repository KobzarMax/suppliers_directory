import { Supplier, NewSupplier } from "../types/supplier";

const API_BASE_URL = "http://localhost:3001";

export interface FetchSuppliersResponse {
  data: Supplier[];
  totalCount: number;
}

export async function fetchSuppliers(
  query?: string,
  page?: number,
  limit?: number
): Promise<FetchSuppliersResponse> {
  const url = new URL(`${API_BASE_URL}/suppliers`);
  if (query) {
    url.searchParams.append("q", query);
  }
  if (page !== undefined) {
    url.searchParams.append("_page", page.toString());
  }
  if (limit !== undefined) {
    url.searchParams.append("_limit", limit.toString());
  }
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch suppliers");
  }
  
  const totalCount = parseInt(response.headers.get("X-Total-Count") || "0", 10);
  const data = await response.json();
  
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return { data, totalCount };
}

export async function fetchSupplier(id: string): Promise<Supplier> {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch supplier with id ${id}`);
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return response.json();
}

export async function createSupplier(supplier: NewSupplier): Promise<Supplier> {
  const response = await fetch(`${API_BASE_URL}/suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...supplier,
      createdAt: new Date().toISOString(),
    }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create supplier");
  }
  
  return response.json();
}
