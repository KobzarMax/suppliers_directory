import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSuppliers, fetchSupplier, createSupplier } from "../api/client";
import { NewSupplier } from "../types/supplier";

export const supplierKeys = {
  all: ["suppliers"] as const,
  lists: () => [...supplierKeys.all, "list"] as const,
  list: (query: string, page: number, limit: number) =>
    [...supplierKeys.lists(), { query, page, limit }] as const,
  details: () => [...supplierKeys.all, "detail"] as const,
  detail: (id: string) => [...supplierKeys.details(), id] as const,
};

export function useSuppliers(query = "", page = 1, limit = 10) {
  return useQuery({
    queryKey: supplierKeys.list(query, page, limit),
    queryFn: () => fetchSuppliers(query, page, limit),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
}

export function usePrefetchSuppliers(query = "", page = 1, limit = 10) {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.prefetchQuery({
      queryKey: supplierKeys.list(query, page, limit),
      queryFn: () => fetchSuppliers(query, page, limit),
      staleTime: 5000,
    });
  };
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: supplierKeys.detail(id),
    queryFn: () => fetchSupplier(id),
    enabled: !!id,
    staleTime: 30000,
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
