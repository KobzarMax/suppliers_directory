import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SupplierList } from "../SupplierList/SupplierList";
import { useSuppliers } from "../../../hooks/useSuppliers";

jest.mock("../../../hooks/useSuppliers", () => ({
  useSuppliers: jest.fn(),
}));

const mockSuppliers = [
  {
    id: "1",
    name: "Supplier A",
    registrationNumber: "REG1",
    country: "UK",
    categories: ["Cat 1"],
    complianceStatus: "Verified",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Supplier B",
    registrationNumber: "REG2",
    country: "FR",
    categories: ["Cat 2"],
    complianceStatus: "Pending",
    createdAt: "2023-01-02T00:00:00Z",
  },
];

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("SupplierList", () => {
  it("should render loading state", () => {
    (useSuppliers as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    renderWithRouter(
      <SupplierList 
        query="" 
        page={1} 
        limit={10} 
        onPageChange={jest.fn()} 
        onLimitChange={jest.fn()} 
      />
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useSuppliers as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error("Failed to load"),
    });

    renderWithRouter(
      <SupplierList 
        query="" 
        page={1} 
        limit={10} 
        onPageChange={jest.fn()} 
        onLimitChange={jest.fn()} 
      />
    );
    expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
  });

  it("should render empty state", () => {
    (useSuppliers as jest.Mock).mockReturnValue({
      data: { data: [], totalCount: 0 },
      isLoading: false,
    });

    renderWithRouter(
      <SupplierList 
        query="" 
        page={1} 
        limit={10} 
        onPageChange={jest.fn()} 
        onLimitChange={jest.fn()} 
      />
    );
    expect(screen.getByText(/no suppliers found/i)).toBeInTheDocument();
  });

  it("should render list of suppliers", () => {
    (useSuppliers as jest.Mock).mockReturnValue({
      data: { data: mockSuppliers, totalCount: mockSuppliers.length },
      isLoading: false,
    });

    renderWithRouter(
      <SupplierList 
        query="" 
        page={1} 
        limit={10} 
        onPageChange={jest.fn()} 
        onLimitChange={jest.fn()} 
      />
    );

    expect(screen.getByText("Supplier A")).toBeInTheDocument();
    expect(screen.getByText("Supplier B")).toBeInTheDocument();
    expect(screen.getByText("UK")).toBeInTheDocument();
    expect(screen.getByText("FR")).toBeInTheDocument();
  });
});
