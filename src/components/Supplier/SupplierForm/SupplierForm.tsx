import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateSupplier } from "../../../hooks/useSuppliers";
import { Country } from "../../../types/supplier";
import { AlertCircle } from "lucide-react";
import "./SupplierForm.css";

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
    <form onSubmit={handleSubmit(onSubmit)} className="supplier-form" aria-label="Add New Supplier Form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          id="name" 
          {...register("name")} 
          className={errors.name ? "error" : ""} 
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span className="error-message" id="name-error" role="alert">
            <AlertCircle size={14} /> {errors.name.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="registrationNumber">Registration Number</label>
        <input
          id="registrationNumber"
          {...register("registrationNumber")}
          className={errors.registrationNumber ? "error" : ""}
          placeholder="e.g. AB123456"
          aria-invalid={errors.registrationNumber ? "true" : "false"}
          aria-describedby={errors.registrationNumber ? "registrationNumber-error" : undefined}
        />
        {errors.registrationNumber && (
          <span className="error-message" id="registrationNumber-error" role="alert">
            <AlertCircle size={14} /> {errors.registrationNumber.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select 
          id="country" 
          {...register("country")} 
          className={errors.country ? "error" : ""}
          aria-invalid={errors.country ? "true" : "false"}
          aria-describedby={errors.country ? "country-error" : undefined}
        >
          <option value="">Select a country</option>
          <option value="UK">UK</option>
          <option value="FR">FR</option>
          <option value="ES">ES</option>
          <option value="DE">DE</option>
          <option value="IE">IE</option>
        </select>
        {errors.country && (
          <span className="error-message" id="country-error" role="alert">
            <AlertCircle size={14} /> {errors.country.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="categories">Categories (comma separated)</label>
        <input
          id="categories"
          {...register("categories")}
          className={errors.categories ? "error" : ""}
          placeholder="e.g. Electronics, Logistics"
          aria-invalid={errors.categories ? "true" : "false"}
          aria-describedby={errors.categories ? "categories-error" : undefined}
        />
        {errors.categories && (
          <span className="error-message" id="categories-error" role="alert">
            <AlertCircle size={14} /> {errors.categories.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="complianceStatus">Compliance Status</label>
        <select id="complianceStatus" {...register("complianceStatus")} aria-label="Select compliance status">
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
