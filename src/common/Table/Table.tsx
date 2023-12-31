import React, { useEffect } from "react";

import { clsx } from "clsx";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type {
  SortingState,
  ColumnDef,
  HeaderGroup,
  Header,
  Row,
  Cell,
  TableOptions,
} from "@tanstack/react-table";

type Props<T> = {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  defaultSorting?: SortingState;
  onSort?: (sort: SortingState | null) => void;
  overrideTableClassName?: string;
  onClickTableRow?: (row: Row<T>) => void;
};

export const Table = <T extends object>({
  columns,
  data = [],
  defaultSorting = [],
  onSort,
  overrideTableClassName = "",
  onClickTableRow,
}: Props<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);

  const options: TableOptions<T> = {
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  };

  const { getHeaderGroups, getRowModel } = useReactTable<T>(options);

  useEffect(() => {
    if (onSort) {
      onSort(sorting);
    }
  }, [sorting]);

  const tableClassName = clsx("table", overrideTableClassName);

  return (
    <table className={tableClassName}>
      <thead>
        {getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: Header<T, unknown>) => {
              const canSort = header.column.getCanSort();
              const className = clsx("flex", {
                "items-center cursor-pointer": canSort,
              });

              return (
                <th key={header.id} className="p-2">
                  {canSort ? (
                    <div onClick={header.column.getToggleSortingHandler()} className={className}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <FaSortDown />,
                        desc: <FaSortUp />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row: Row<T>) => {
          return (
            <tr
              key={row.id}
              onClick={() => onClickTableRow && onClickTableRow(row)}
              className="cursor-default"
            >
              {row.getVisibleCells().map((cell: Cell<T, unknown>) => {
                return (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
