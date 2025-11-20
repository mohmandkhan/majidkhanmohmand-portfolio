import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdminTable } from "./AdminTable";
import { TextInput, TextArea, Select, FormActions } from "./FormComponents";
import { Edit2, X, Plus } from "lucide-react";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "email" | "url" | "number" | "date" | "select" | "checkbox" | "json";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface GenericContentManagerProps<T extends { id: number }> {
  title: string;
  fields: FieldConfig[];
  data?: T[];
  isLoading?: boolean;
  onAdd: (data: any) => Promise<void>;
  onEdit: (id: number, data: any) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  displayColumns: (keyof T)[];
  displayLabels: string[];
}

export function GenericContentManager<T extends { id: number }>({
  title,
  fields,
  data = [],
  isLoading,
  onAdd,
  onEdit,
  onDelete,
  displayColumns,
  displayLabels,
}: GenericContentManagerProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({});
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: T) => {
    setEditingItem(item);
    setFormData({ ...item });
    setError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
    setError(null);
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Validate required fields
      for (const field of fields) {
        if (field.required && !formData[field.name]) {
          setError(`${field.label} is required`);
          setIsSaving(false);
          return;
        }
      }

      if (editingItem) {
        await onEdit(editingItem.id, formData);
      } else {
        await onAdd(formData);
      }

      handleCloseModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: T) => {
    if (window.confirm(`Are you sure you want to delete this ${title.toLowerCase()}?`)) {
      try {
        await onDelete(item.id);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete");
      }
    }
  };

  const tableColumns = displayColumns.map((col, idx) => ({
    header: displayLabels[idx],
    accessor: col,
    render: (value: any) => {
      if (value === null || value === undefined) return "-";
      if (typeof value === "boolean") return value ? "Yes" : "No";
      if (Array.isArray(value)) return value.join(", ");
      if (typeof value === "object") return JSON.stringify(value);
      return String(value).substring(0, 50);
    },
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title} Manager</h1>
        <p className="text-muted-foreground mt-2">Manage all {title.toLowerCase()} on your website</p>
      </div>

      <AdminTable
        columns={tableColumns}
        data={data}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onAdd={handleOpenAdd}
        isLoading={isLoading}
        emptyMessage={`No ${title.toLowerCase()} found. Click "Add New" to create one.`}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editingItem ? `Edit ${title}` : `Add New ${title}`}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {fields.map((field) => {
                  const value = formData[field.name] ?? "";

                  if (field.type === "textarea") {
                    return (
                      <TextArea
                        key={field.name}
                        label={field.label}
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    );
                  }

                  if (field.type === "select" && field.options) {
                    return (
                      <Select
                        key={field.name}
                        label={field.label}
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        options={field.options}
                        required={field.required}
                      />
                    );
                  }

                  if (field.type === "checkbox") {
                    return (
                      <div key={field.name} className="mb-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={value === true || value === "true"}
                            onChange={(e) => handleInputChange(field.name, e.target.checked)}
                            className="w-4 h-4 rounded border-border"
                          />
                          <span className="text-sm font-medium">{field.label}</span>
                        </label>
                      </div>
                    );
                  }

                  if (field.type === "json") {
                    return (
                      <TextArea
                        key={field.name}
                        label={field.label}
                        value={typeof value === "string" ? value : JSON.stringify(value, null, 2)}
                        onChange={(e) => {
                          try {
                            handleInputChange(field.name, JSON.parse(e.target.value));
                          } catch {
                            handleInputChange(field.name, e.target.value);
                          }
                        }}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    );
                  }

                  return (
                    <TextInput
                      key={field.name}
                      label={field.label}
                      type={field.type}
                      value={value}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  );
                })}
              </div>

              <FormActions
                onSubmit={handleSubmit}
                onCancel={handleCloseModal}
                isLoading={isSaving}
                submitLabel={editingItem ? "Update" : "Create"}
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
