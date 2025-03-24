import { useNavigate } from "@tanstack/react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const useRankingDataTable = (data: WorldRanks.RankingTableData[]) => {
  console.log("🚀 ~ useCountryRanking ~ data:", data);
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<WorldRanks.RankingTableData>();

  const columns = [
    columnHelper.accessor("flags.png", {
      cell: (info) => (
        <img
          className="aspect-[1.618] w-[60px] rounded-sm object-contain mx-4"
          src={info.getValue()}
        ></img>
      ),
      header: "Flag",
      maxSize: 100,
    }),
    columnHelper.accessor("name.common", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("population", {
      cell: (info) => info.getValue(),
      header: "Population",
    }),
    columnHelper.accessor("area", {
      cell: (info) => info.getValue(),
      header: "Area(km2)",
    }),
    columnHelper.accessor("region", {
      cell: (info) => info.getValue(),
      header: "Region",
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: data.length,
  });

  const handleRowClick = (countryCode: string) => {
    navigate({ to: `/country/${countryCode}` });
  };

  return { handleRowClick, table };
};
