import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Upload, X } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function TextInput({ label, error, required, ...props }: TextInputProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <Input
        {...props}
        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
      />
    </FormField>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function TextArea({ label, error, required, ...props }: TextAreaProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <textarea
        {...props}
        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
        rows={4}
      />
    </FormField>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
}

export function Select({ label, options, error, required, ...props }: SelectProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <select
        {...props}
        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  error?: string;
  required?: boolean;
}

export function ImageUpload({ label, value, onChange, error, required }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // TODO: Implement file upload to S3
      // For now, create a local preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setPreview(url);
        onChange(url);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField label={label} error={error} required={required}>
      <div className="space-y-4">
        {preview && (
          <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                onChange("");
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition">
          <div className="flex flex-col items-center">
            <Upload size={24} className="mb-2" />
            <span className="text-sm">Click to upload or drag and drop</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
    </FormField>
  );
}

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function FormActions({
  onSubmit,
  onCancel,
  isLoading,
  submitLabel = "Save",
}: FormActionsProps) {
  return (
    <div className="flex gap-3 mt-6">
      <Button onClick={onSubmit} disabled={isLoading} variant="default">
        {isLoading ? "Saving..." : submitLabel}
      </Button>
      <Button onClick={onCancel} variant="outline">
        Cancel
      </Button>
    </div>
  );
}
