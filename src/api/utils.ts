const restCountriesBaseUrl = "https://restcountries.com/v3.1";

export const fetchCountry = async (code: string) => {
  const response = await fetch(`${restCountriesBaseUrl}/alpha/${code}`);
  return response.json();
};

export const fetchCountries = async (independent?: boolean) => {
  const response = await fetch(
    `${restCountriesBaseUrl}/${independent ? `independent?status=${independent}&` : "all?"}fields=name,population,region,area,flags,cca2,unMember`,
  );
  return response.json() as Promise<WorldRanks.RankingTableData[]>;
};
