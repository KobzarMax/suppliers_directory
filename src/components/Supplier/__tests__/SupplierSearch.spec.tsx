import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SupplierSearch } from "../SupplierSearch/SupplierSearch";

jest.mock("lodash/debounce", () => {
  return <T extends (...args: unknown[]) => unknown>(fn: T) => {
    const mocked = fn as T & { cancel: jest.Mock };
    mocked.cancel = jest.fn();
    return mocked;
  };
});

describe("SupplierSearch", () => {
  it("should render the search input", () => {
    render(<SupplierSearch onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText(/search by name.../i)).toBeInTheDocument();
  });

  it("should call onSearch when input changes", async () => {
    const onSearch = jest.fn();
    render(<SupplierSearch onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText(/search by name.../i);
    await userEvent.type(input, "Apple");
    
    expect(onSearch).toHaveBeenCalledWith("Apple");
  });

  it("should initialize with initialValue", () => {
    render(<SupplierSearch onSearch={jest.fn()} initialValue="Orange" />);
    expect(screen.getByDisplayValue("Orange")).toBeInTheDocument();
  });
});
