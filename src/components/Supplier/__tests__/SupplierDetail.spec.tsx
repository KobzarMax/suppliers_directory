import { render, screen } from "@testing-library/react";
import { SupplierDetail } from "../SupplierDetail/SupplierDetail";
import { useSupplier } from "../../../hooks/useSuppliers";

jest.mock("../../../hooks/useSuppliers", () => ({
  useSupplier: jest.fn(),
}));

const mockSupplier = {
  id: "1",
  name: "Test Supplier",
  registrationNumber: "REG123",
  country: "UK",
  categories: ["Electronics"],
  complianceStatus: "Verified",
  createdAt: "2023-01-01T00:00:00Z",
};

describe("SupplierDetail", () => {
  it("should render loading state", () => {
    (useSupplier as jest.Mock).mockReturnValue({ isLoading: true });
    render(<SupplierDetail id="1" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useSupplier as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error("Failed to load"),
    });
    render(<SupplierDetail id="1" />);
    expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
  });

  it("should render empty state when supplier is not found", () => {
    (useSupplier as jest.Mock).mockReturnValue({ data: null, isLoading: false });
    render(<SupplierDetail id="1" />);
    expect(screen.getByText(/supplier not found/i)).toBeInTheDocument();
  });

  it("should render supplier details", () => {
    (useSupplier as jest.Mock).mockReturnValue({
      data: mockSupplier,
      isLoading: false,
    });
    render(<SupplierDetail id="1" />);
    
    expect(screen.getByText("Test Supplier")).toBeInTheDocument();
    expect(screen.getByText("REG123")).toBeInTheDocument();
    expect(screen.getByText("UK")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Verified")).toBeInTheDocument();
  });
});
