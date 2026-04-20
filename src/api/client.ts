import { Supplier, NewSupplier } from "../types/supplier";

const API_BASE_URL = "http://localhost:3001";

export async function fetchSuppliers(query?: string): Promise<Supplier[]> {
  const url = new URL(`${API_BASE_URL}/suppliers`);
  if (query) {
    url.searchParams.append("q", query);
  }
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch suppliers");
  }
  
  // Simulate latency (~500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return response.json();
}

export async function fetchSupplier(id: string): Promise<Supplier> {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch supplier with id ${id}`);
  }
  
  // Simulate latency (~500ms)
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
