import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchCountry } from "src/api/utils";
import { Skeleton } from "../common/Skeleton";

type BorderCountryProps = {
  countryCode: string;
};

export const BorderCountry = ({ countryCode }: BorderCountryProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [countryData, setCountryData] = useState<WorldRanks.CountryInfo>();

  useEffect(() => {
    setIsFetching(true);
    fetchCountry(countryCode)
      .then((response) => {
        setCountryData(response);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [countryCode]);

  return isFetching ? (
    <Skeleton className="h1 w-full" rounded="full"></Skeleton>
  ) : (
    <Link
      to={`/country/$code`}
      params={{ code: countryCode }}
      className="flex flex-row items-center gap-2"
    >
      <img className="w-5 aspect-[1.618]" src={countryData?.flags.png} />
      <p className="font-bold">{countryData?.name.common}</p>
    </Link>
  );
};

export default BorderCountry;
