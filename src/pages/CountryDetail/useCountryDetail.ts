import { useLoaderData } from "@tanstack/react-router";

export const useCountryDetail = () => {
  const countryData = useLoaderData({ from: "/country/$code" });

  // const neighborCountries = country.

  return { countryData };
};
