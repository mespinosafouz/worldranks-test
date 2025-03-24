import { useNavigate } from "@tanstack/react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "src/components/common/Skeleton";

export const useRankingDataTable = (
  data: WorldRanks.RankingTableData[],
  isFetching: boolean,
) => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<WorldRanks.RankingTableData>();

  const columns = [
    columnHelper.accessor("flags.png", {
      cell: (info) =>
        isFetching ? (
          <Skeleton className="h-[40px] w-[60px] mx-4" rounded="md" />
        ) : (
          <img
            className="aspect-[1.618] w-[60px] rounded-sm object-contain mx-4"
            src={info.getValue()}
          ></img>
        ),
      header: "Flag",
      maxSize: 100,
      minSize: 100,
    }),
    columnHelper.accessor("name.common", {
      cell: (info) =>
        isFetching ? (
          <Skeleton className="h-[18px] w-[120px]" rounded="full" />
        ) : (
          info.getValue()
        ),
      header: "Name",
    }),
    columnHelper.accessor("population", {
      cell: (info) =>
        isFetching ? (
          <Skeleton className="h-[18px] w-[100px]" rounded="full" />
        ) : (
          info.getValue()
        ),
      header: "Population",
    }),
    columnHelper.accessor("area", {
      cell: (info) =>
        isFetching ? (
          <Skeleton className="h-[18px] w-[80px]" rounded="full" />
        ) : (
          info.getValue()
        ),
      header: "Area(km2)",
    }),
    columnHelper.accessor("region", {
      cell: (info) =>
        isFetching ? (
          <Skeleton className="h-[18px] w-[80px]" rounded="full" />
        ) : (
          info.getValue()
        ),
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
