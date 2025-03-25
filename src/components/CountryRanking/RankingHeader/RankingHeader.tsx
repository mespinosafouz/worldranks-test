import { debounce } from "lodash";
import { useEffect, useMemo } from "react";

import { useFiltersContext } from "src/context/useFiltersContext";

type RankingHeaderProps = {
  countriesCount: number;
};
export const RankingHeader = ({ countriesCount }: RankingHeaderProps) => {
  const {
    state: { searchTerm },
    actions: { setSearchTerm },
  } = useFiltersContext();

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 800),
    [setSearchTerm],
  );

  useEffect(() => {
    return debouncedSetSearchTerm.cancel();
  }, [debouncedSetSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-between items-center w-full mb-12">
      <p className="text-xl font-bold">{`Found ${countriesCount} countries`}</p>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 bg-[var(--color-bg-ui)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
          defaultValue={searchTerm}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default RankingHeader;
