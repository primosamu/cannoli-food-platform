
import React from 'react';

interface Column {
  accessorKey?: string;
  id?: string;
  header: string;
  cell?: ({ row }: { row: { getValue: (key: string) => any; original: any } }) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export function DataTable({ columns, data }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessorKey || column.id}
                className="px-4 py-3 text-left"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map((column) => (
                <td key={column.accessorKey || column.id} className="px-4 py-3">
                  {column.cell ? column.cell({ row: { getValue: (key) => row[key], original: row } }) : row[column.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
