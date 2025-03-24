import { useEffect, useState } from "react";
import { Checkbox, Field, Label, Select } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { RegionFilter } from "./RegionFilter";

export const RankingFilters = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{
    unitedNationsMember: boolean;
    independent: boolean;
  }>({
    unitedNationsMember: false,
    independent: true,
  });

  useEffect(() => {
    console.log(selectedStatus);
    console.log(selectedRegions);
  }, [selectedRegions, selectedStatus]);

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
              defaultValue={"population"}
            >
              <option value="name">Name</option>
              <option value="population">Population</option>
              <option value="area">Area(km2)</option>
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
          <RegionFilter
            selectedRegions={selectedRegions}
            setSelectedRegions={setSelectedRegions}
          ></RegionFilter>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs font-bold">Status</p>
        <div className="flex flex-col items-start">
          <Field className="flex flex-row items-center gap-2">
            <Checkbox
              className="group block size-4 rounded border data-[checked]:bg-blue-500 transition-colors duration-300"
              onChange={(checked) =>
                setSelectedStatus((prev) => ({
                  ...prev,
                  unitedNationsMember: checked,
                }))
              }
              defaultChecked={selectedStatus.unitedNationsMember}
            >
              <CheckIcon className="hidden size-4 fill-white group-data-[checked]:block transition-opacity duration-400 opacity-0 group-data-[checked]:opacity-100" />
            </Checkbox>
            <Label>Member of the United Nations</Label>
          </Field>
          <Field className="flex flex-row items-center gap-2">
            <Checkbox
              className="group block size-4 rounded border data-[checked]:bg-blue-500"
              onChange={(checked) =>
                setSelectedStatus((prev) => ({
                  ...prev,
                  independent: checked,
                }))
              }
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
