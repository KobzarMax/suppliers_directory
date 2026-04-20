import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SupplierForm } from "../SupplierForm";
import { useCreateSupplier } from "../../hooks/useSuppliers";

// Mock the hook
jest.mock("../../hooks/useSuppliers", () => ({
  useCreateSupplier: jest.fn(),
}));

describe("SupplierForm", () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useCreateSupplier as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show validation errors for empty fields", async () => {
    render(<SupplierForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const submitButton = screen.getByRole("button", { name: /create supplier/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/please select a country/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least one category is required/i)).toBeInTheDocument();
  });

  it("should show validation error for invalid registration number", async () => {
    render(<SupplierForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const regInput = screen.getByLabelText(/registration number/i);
    await userEvent.type(regInput, "abc"); // Too short and lowercase
    
    const submitButton = screen.getByRole("button", { name: /create supplier/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/invalid registration number format/i)).toBeInTheDocument();
  });

  it("should call mutate when form is valid", async () => {
    render(<SupplierForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    await userEvent.type(screen.getByLabelText(/name/i), "Test Supplier");
    await userEvent.type(screen.getByLabelText(/registration number/i), "ABC123456");
    await userEvent.selectOptions(screen.getByLabelText(/country/i), "UK");
    await userEvent.type(screen.getByLabelText(/categories/i), "Electronics, Software");
    
    fireEvent.click(screen.getByRole("button", { name: /create supplier/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Supplier",
          registrationNumber: "ABC123456",
          country: "UK",
          categories: ["Electronics", "Software"],
        }),
        expect.any(Object)
      );
    });
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(<SupplierForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
