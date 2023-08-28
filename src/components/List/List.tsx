import { createColumnHelper } from "@tanstack/react-table";
import type { CellContext, ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { FcFile, FcFolder } from "react-icons/fc";

import { Table } from "../../common";
import type { TableColumnsModel, TypeEnum } from "../../models";

const columnHelper = createColumnHelper<TableColumnsModel>();

type Props = {
  data: TableColumnsModel[];
  onClickTableRow: (row: Row<TableColumnsModel>) => void;
};

export const List: FC<Props> = ({ data, onClickTableRow }) => {
  const columns = useMemo<Array<ColumnDef<TableColumnsModel>>>(
    () => [
      columnHelper.display({
        id: "type",
        cell: (props: CellContext<TableColumnsModel, TypeEnum>): ReactNode => {
          const { row } = props;
          const { type } = row.original;

          const Icon = {
            file: FcFile,
            folder: FcFolder,
          }[type];

          return <Icon />;
        },
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.display({
        header: "Extension",
        cell: (props: CellContext<TableColumnsModel, string>): ReactNode => {
          const { row } = props;
          const { name: filename, type } = row.original;
          if (type === "folder") {
            return null;
          }

          // Use .at and lib 2022
          const splitFilename = filename.split(".");
          const extension = splitFilename[splitFilename.length - 1];

          return extension;
        },
      }),
      columnHelper.accessor("size", {
        header: "Size",
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: (props: CellContext<TableColumnsModel, Date>): ReactNode => {
          const { cell } = props;
          const value = cell.getValue();
          const formatDate = format(new Date(value), "MM/dd/yyyy HH:mm:ss");

          return formatDate;
        },
      }),
    ],
    [],
  );

  return (
    <div>
      <Table<TableColumnsModel> columns={columns} data={data} onClickTableRow={onClickTableRow} />
    </div>
  );
};
