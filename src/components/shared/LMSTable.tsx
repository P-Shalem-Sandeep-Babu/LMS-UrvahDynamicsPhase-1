import React from "react";
import { cn } from "../../lib/utils";

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  cell: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

interface LMSTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  className?: string;
  onRowClick?: (item: T) => void;
  emptyState?: React.ReactNode;
}

export function LMSTable<T>({ columns, data, keyExtractor, className, onRowClick, emptyState }: LMSTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className={cn("p-8 flex flex-col items-center justify-center border border-dashed border-border/80 text-center", className)}>
        {emptyState || <span className="text-sm font-mono text-muted-foreground/80">No data available</span>}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto border border-border hide-scrollbar", className)}>
      <table className="w-full text-left border-collapse min-w-max">
        <thead>
          <tr className="border-b border-border bg-white/[0.02]">
            {columns.map((col) => (
              <th 
                key={col.key} 
                className={cn(
                  "p-4 text-[10px] font-bold font-mono uppercase tracking-widest text-muted-foreground",
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                  col.width
                )}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr 
              key={keyExtractor(item)} 
              onClick={() => onRowClick?.(item)}
              className={cn(
                "border-b border-border/50 transition-colors group",
                onRowClick ? "cursor-pointer hover:bg-white/[0.05]" : "hover:bg-white/[0.02]"
              )}
            >
              {columns.map((col) => (
                <td 
                  key={col.key} 
                  className={cn(
                    "p-4",
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                  )}
                >
                  {col.cell(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
