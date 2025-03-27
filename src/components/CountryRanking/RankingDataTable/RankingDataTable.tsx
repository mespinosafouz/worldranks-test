import RankingFilters from "@components/CountryRanking/RankingFilters/RankingFilters";
import { flexRender } from "@tanstack/react-table";
import { useRankingDataTable } from "./useRankingDataTable";
import { useTranslation } from "react-i18next";

type Props = {
  data: WorldRanks.RankingTableData[];
  isFetching: boolean;
};

export const RankingDataTable = ({ data, isFetching }: Props) => {
  const { handleRowClick, table } = useRankingDataTable(data, isFetching);
  const { t } = useTranslation("countryRanking", {
    keyPrefix: "rankingDatatable",
  });

  return (
    <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-[1fr_3fr]">
      <RankingFilters />
      <div className="overflow-x-scroll md:overflow-x-auto">
        <table className="w-full min-w-2xl px-8" style={{ padding: "0 1rem" }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="h-16 py-8">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-start">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="h-16 py-8 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  handleRowClick(row.original.cca2);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="first:rounded-l-md last:rounded-r-md"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className="flex flex-col items-center justify-end gap-4 mt-6 md:flex-row md:col-span-2 ">
        <div className="flex justify-center gap-4 w-full md:justify-end">
          <button
            className="border rounded p-1 w-8"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1 w-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1 w-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1 w-8"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <div>{t("page")}</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {t("show", { pageSize })}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RankingDataTable;
