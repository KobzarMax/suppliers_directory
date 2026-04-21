import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "../HomePage";
import { useSuppliers } from "@/hooks/useSuppliers";

jest.mock("@/hooks/useSuppliers", () => ({
  useSuppliers: jest.fn(),
  usePrefetchSuppliers: jest.fn(() => jest.fn()),
}));

interface MockSupplierSearchProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

jest.mock("@/components/Supplier/SupplierSearch/SupplierSearch", () => ({
  SupplierSearch: ({ onSearch, initialValue }: MockSupplierSearchProps) => (
    <input 
      data-testid="mock-search" 
      defaultValue={initialValue} 
      onChange={(e) => onSearch(e.target.value)} 
    />
  ),
}));

describe("HomePage", () => {
  beforeEach(() => {
    (useSuppliers as jest.Mock).mockReturnValue({
      data: { data: [], totalCount: 0 },
      isLoading: false,
    });
  });

  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  };

  it("should render search input and supplier list", () => {
    renderHomePage();
    expect(screen.getByTestId("mock-search")).toBeInTheDocument();
    expect(screen.getByText(/no suppliers found/i)).toBeInTheDocument();
  });

  it("should update search query when input changes", async () => {
    renderHomePage();
    const searchInput = screen.getByTestId("mock-search");
    
    await userEvent.type(searchInput, "Tech");
    
    expect(useSuppliers).toHaveBeenCalledWith("Tech", 1, 10);
  });
});
