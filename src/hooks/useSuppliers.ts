import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSuppliers, fetchSupplier, createSupplier } from "../api/client";
import { NewSupplier } from "../types/supplier";

export const supplierKeys = {
  all: ["suppliers"] as const,
  lists: () => [...supplierKeys.all, "list"] as const,
  list: (query: string) => [...supplierKeys.lists(), { query }] as const,
  details: () => [...supplierKeys.all, "detail"] as const,
  detail: (id: string) => [...supplierKeys.details(), id] as const,
};

export function useSuppliers(query = "") {
  return useQuery({
    queryKey: supplierKeys.list(query),
    queryFn: () => fetchSuppliers(query),
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: supplierKeys.detail(id),
    queryFn: () => fetchSupplier(id),
    enabled: !!id,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (supplier: NewSupplier) => createSupplier(supplier),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() });
    },
  });
}
