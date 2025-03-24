import { PropsWithChildren, useCallback } from "react";

const REGIONS = [
  "Americas",
  "Antartica",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
];

type RegionFilterProps = {
  selectedRegions: string[];
  setSelectedRegions: (region: string[]) => void;
};

type RegionFilterButtonProps = {
  active: boolean;
  toggleActive: (status: boolean) => void;
} & PropsWithChildren;

const RegionFilterButton = ({
  active,
  toggleActive,
  children,
}: RegionFilterButtonProps) => {
  const handleClick = () => {
    toggleActive(!active);
  };

  return (
    <div
      className={`cursor-pointer inline-block px-3 py-1 rounded-xl font-medium transition-colors duration-300 border select-none border-[var(--color-bg-ui)] 
    ${active && "bg-[var(--color-bg-ui)] text-[var(--color-text)]"}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export const RegionFilter = ({
  selectedRegions,
  setSelectedRegions,
}: RegionFilterProps) => {
  const handleRegionClick = useCallback(
    (region: string, status: boolean) => {
      if (status) {
        setSelectedRegions([...selectedRegions, region]);
      } else {
        setSelectedRegions(selectedRegions.filter((r) => r !== region));
      }
    },
    [selectedRegions, setSelectedRegions],
  );

  return (
    <div className="flex flex-wrap gap-2">
      {REGIONS.map((region) => (
        <RegionFilterButton
          key={region}
          active={selectedRegions.includes(region)}
          toggleActive={(status) => handleRegionClick(region, status)}
        >
          {region}
        </RegionFilterButton>
      ))}
    </div>
  );
};

export default RegionFilter;
