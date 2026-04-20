export type Country = "UK" | "FR" | "ES" | "DE" | "IE";

export type ComplianceStatus = "Verified" | "Pending" | "NotVerified";

export type Supplier = {
  id: string;
  name: string;
  registrationNumber: string;
  country: Country;
  categories: string[];
  complianceStatus: ComplianceStatus;
  createdAt: string;
};

export type NewSupplier = Omit<Supplier, "id" | "createdAt">;
