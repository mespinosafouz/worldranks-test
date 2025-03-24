import { useContext } from "react";
import { FiltersContext } from "./FiltersContext";

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  const {
    state: { selectedRegions, selectedStatus, sortedBy },
    actions: {
      setSelectedRegions,
      setIndependent,
      setUnitedNationsMember,
      setSortedBy,
    },
  } = context;

  return {
    state: { selectedRegions, selectedStatus, sortedBy },
    actions: {
      setSelectedRegions,
      setIndependent,
      setUnitedNationsMember,
      setSortedBy,
    },
  };
};
