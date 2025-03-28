import { useState, ReactNode } from "react";
import { FiltersContext, RankingSortingOption, Region } from "./FiltersContext";

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [sortedBy, setSortedBy] = useState<RankingSortingOption>(
    RankingSortingOption.Population,
  );
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{
    unitedNationsMember: boolean;
    independent: boolean;
  }>({
    unitedNationsMember: false,
    independent: true,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const setIndependent = (status: boolean) => {
    setSelectedStatus((prev) => ({
      ...prev,
      independent: status,
    }));
  };

  const setUnitedNationsMember = (status: boolean) => {
    setSelectedStatus((prev) => ({
      ...prev,
      unitedNationsMember: status,
    }));
  };

  return (
    <FiltersContext.Provider
      value={{
        state: {
          sortedBy,
          selectedRegions,
          selectedStatus,
          searchTerm,
        },
        actions: {
          setSortedBy,
          setSelectedRegions,
          setIndependent,
          setUnitedNationsMember,
          setSearchTerm,
        },
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
