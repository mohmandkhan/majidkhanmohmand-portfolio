import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface AdminTableProps<T extends { id: number }> {
  columns: Column<T>[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onAdd: () => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function AdminTable<T extends { id: number }>({
  columns,
  data,
  onEdit,
  onDelete,
  onAdd,
  isLoading,
  emptyMessage = "No items found",
}: AdminTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onAdd} variant="default">
          <Plus size={20} className="mr-2" />
          Add New
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.accessor)}
                    className={`px-6 py-3 text-left text-sm font-semibold ${col.width || ""}`}
                  >
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-sm font-semibold w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-muted/50 transition">
                  {columns.map((col) => (
                    <td key={String(col.accessor)} className="px-6 py-4 text-sm">
                      {col.render
                        ? col.render(row[col.accessor], row)
                        : String(row[col.accessor] || "-")}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(row)}
                        className="gap-1"
                      >
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(row)}
                        className="gap-1 text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
