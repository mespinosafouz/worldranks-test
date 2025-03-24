import { PropsWithChildren, useCallback } from "react";
import { Region } from "src/context/FiltersContext";
import { useFiltersContext } from "src/context/useFiltersContext";

const regions = Object.values(Region);

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

export const RegionFilter = () => {
  const {
    state: { selectedRegions },
    actions: { setSelectedRegions },
  } = useFiltersContext();

  const handleRegionClick = useCallback(
    (region: Region, status: boolean) => {
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
      {regions.map((region) => (
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
