const restCountriesBaseUrl = "https://restcountries.com/v3.1";

export const fetchCountry = async (code: string) => {
  const response = await fetch(`${restCountriesBaseUrl}/alpha/${code}`);
  return response.json();
};

export const fetchCountries = async () => {
  const response = await fetch(
    `${restCountriesBaseUrl}/all?fields=name,population,region,area,flags,cca2`,
  );
  return response.json() as Promise<WorldRanks.RankingTableData[]>;
};
