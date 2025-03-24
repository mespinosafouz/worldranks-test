import { createContext } from "react";

export enum RankingSortingOption {
  Name = "name",
  Population = "population",
  Area = "area",
}

export enum Region {
  Africa = "Africa",
  Antarctic = "Antarctic",
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

export const Regions = Object.values(Region);
export const RankingSortingOptions: {
  key: keyof typeof RankingSortingOption;
  value: RankingSortingOption;
}[] = Object.keys(RankingSortingOption).map((key) => ({
  key: key as keyof typeof RankingSortingOption,
  value: RankingSortingOption[key as keyof typeof RankingSortingOption],
}));

interface FiltersContextProps {
  state: {
    selectedRegions: Region[];
    selectedStatus: {
      unitedNationsMember: boolean;
      independent: boolean;
    };
    sortedBy: RankingSortingOption;
  };
  actions: {
    setSortedBy: (sortBy: RankingSortingOption) => void;
    setSelectedRegions: (regions: Region[]) => void;
    setIndependent: (status: boolean) => void;
    setUnitedNationsMember: (status: boolean) => void;
  };
}

export const FiltersContext = createContext<FiltersContextProps>(
  {} as FiltersContextProps,
);
