import { Checkbox, Field, Label, Select } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { RegionFilter } from "./RegionFilter";
import { useFiltersContext } from "src/context/useFiltersContext";
import {
  RankingSortingOption,
  RankingSortingOptions,
} from "src/context/FiltersContext";

export const RankingFilters = () => {
  const {
    state: { sortedBy, selectedStatus },
    actions: { setIndependent, setUnitedNationsMember, setSortedBy },
  } = useFiltersContext();

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs font-bold">Sort by</p>
        <Field>
          <div className="relative flex flex-row items-center">
            <Select
              className="w-full border border-[var(--color-border-ui)] p-2 rounded-lg appearance-none focus:outline-none"
              name="sortBy"
              aria-label="Sort By"
              defaultValue={sortedBy}
              onChange={(e) =>
                setSortedBy(e.target.value as RankingSortingOption)
              }
            >
              {RankingSortingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              className="group absolute pointer-events-none right-4 size-4 fill-white/60"
              aria-hidden="true"
            />
          </div>
        </Field>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs font-bold">Region</p>
        <div>
          <RegionFilter></RegionFilter>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs font-bold">Status</p>
        <div className="flex flex-col items-start">
          <Field className="flex flex-row items-center gap-2">
            <Checkbox
              className="group block size-4 rounded border data-[checked]:bg-blue-500 transition-colors duration-300"
              onChange={setUnitedNationsMember}
              defaultChecked={selectedStatus.unitedNationsMember}
            >
              <CheckIcon className="hidden size-4 fill-white group-data-[checked]:block transition-opacity duration-400 opacity-0 group-data-[checked]:opacity-100" />
            </Checkbox>
            <Label>Member of the United Nations</Label>
          </Field>
          <Field className="flex flex-row items-center gap-2">
            <Checkbox
              className="group block size-4 rounded border data-[checked]:bg-blue-500"
              onChange={setIndependent}
              defaultChecked={selectedStatus.independent}
            >
              <CheckIcon className="hidden size-4 fill-white group-data-[checked]:block transition-opacity duration-400 opacity-0 group-data-[checked]:opacity-100" />
            </Checkbox>
            <Label>Independent</Label>
          </Field>
        </div>
      </div>
    </div>
  );
};

export default RankingFilters;
