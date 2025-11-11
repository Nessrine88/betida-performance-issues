import type { ReactNode } from "react";

export type ColumnType<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  tooltip?: string | ReactNode;
};

export interface GlobalTableProps<T> {
  columns: ColumnType<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string | ReactNode;
  maxHeight?: number;
  className?: string;
  variant?: 'normal' | 'rounded'
}
