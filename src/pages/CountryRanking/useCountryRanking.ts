import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "@api/utils";
import { useFiltersContext } from "src/context/useFiltersContext";
import { useEffect, useState } from "react";
import { RankingSortingOption, Region } from "src/context/FiltersContext";

export const useCountryRanking = () => {
  const [rankingTableData, setRankingTableData] = useState<
    WorldRanks.RankingTableData[]
  >([]);

  const {
    state: { selectedRegions, selectedStatus, sortedBy, searchTerm },
  } = useFiltersContext();

  const {
    data: rankingData,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["rankingData"],
    queryFn: async () => await fetchCountries(selectedStatus.independent),
  });

  useEffect(() => {
    refetch();
  }, [selectedStatus, refetch]);

  useEffect(() => {
    if (!rankingData) return;

    let filteredData = rankingData.filter((country) => {
      if (selectedRegions.length > 0) {
        return selectedRegions.includes(country.region as Region);
      }
      return true;
    });

    if (selectedStatus.unitedNationsMember) {
      filteredData = filteredData.filter(
        (country) => country.unMember === true,
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter(
        (country) =>
          country.name.common
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          country.region
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
      );
    }

    const sortedData = filteredData.sort((a, b) => {
      switch (sortedBy) {
        case RankingSortingOption.Name:
          return a.name.common.localeCompare(b.name.common);
        case RankingSortingOption.Population:
          return b.population - a.population;
        case RankingSortingOption.Area:
          return b.area - a.area;
        default:
          return 0;
      }
    });

    setRankingTableData(sortedData);
  }, [rankingData, searchTerm, selectedRegions, selectedStatus, sortedBy]);

  return {
    isFetching,
    rankingData: rankingTableData,
  };
};
