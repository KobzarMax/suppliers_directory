import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateSupplier } from "../hooks/useSuppliers";
import { Country } from "../types/supplier";

const supplierSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  registrationNumber: z.string().regex(/^[A-Z0-9-]{4,12}$/, "Invalid registration number format"),
  country: z.string().min(1, "Please select a country").refine((val) => 
    (["UK", "FR", "ES", "DE", "IE"] as string[]).includes(val),
    { message: "Invalid country selected" }
  ),
  categories: z.string().min(1, "At least one category is required"),
  complianceStatus: z.enum(["Verified", "Pending", "NotVerified"] as const),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

interface SupplierFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function SupplierForm({ onSuccess, onCancel }: SupplierFormProps) {
  const { mutate: createSupplier, isPending } = useCreateSupplier();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      complianceStatus: "Pending",
    },
  });

  const onSubmit = (data: SupplierFormData) => {
    const categoriesArray = data.categories
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat !== "");

    createSupplier(
      {
        ...data,
        country: data.country as Country,
        categories: categoriesArray,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="supplier-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} className={errors.name ? "error" : ""} />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="registrationNumber">Registration Number</label>
        <input
          id="registrationNumber"
          {...register("registrationNumber")}
          className={errors.registrationNumber ? "error" : ""}
          placeholder="e.g. AB123456"
        />
        {errors.registrationNumber && (
          <span className="error-message">{errors.registrationNumber.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" {...register("country")} className={errors.country ? "error" : ""}>
          <option value="">Select a country</option>
          <option value="UK">UK</option>
          <option value="FR">FR</option>
          <option value="ES">ES</option>
          <option value="DE">DE</option>
          <option value="IE">IE</option>
        </select>
        {errors.country && <span className="error-message">{errors.country.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="categories">Categories (comma separated)</label>
        <input
          id="categories"
          {...register("categories")}
          className={errors.categories ? "error" : ""}
          placeholder="e.g. Electronics, Logistics"
        />
        {errors.categories && <span className="error-message">{errors.categories.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="complianceStatus">Compliance Status</label>
        <select id="complianceStatus" {...register("complianceStatus")}>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
          <option value="NotVerified">Not Verified</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="button secondary" disabled={isPending}>
          Cancel
        </button>
        <button type="submit" className="button primary" disabled={isPending}>
          {isPending ? "Creating..." : "Create Supplier"}
        </button>
      </div>
    </form>
  );
}
