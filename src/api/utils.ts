const restCountriesBaseUrl = "https://restcountries.com/v3.1";

export const fetchCountry = async (
  code: string,
): Promise<WorldRanks.CountryInfo> => {
  try {
    const response = await fetch(`${restCountriesBaseUrl}/alpha/${code}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching country with code ${code}: ${response.statusText}`,
      );
    }
    const countryList = (await response.json()) as WorldRanks.CountryInfo[];
    return countryList[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCountries = async (
  independent?: boolean,
): Promise<WorldRanks.RankingTableData[]> => {
  try {
    const response = await fetch(
      `${restCountriesBaseUrl}/${independent ? `independent?status=${independent}&` : "all?"}fields=name,population,region,area,flags,cca2,unMember`,
    );
    if (!response.ok) {
      throw new Error(`Error fetching countries: ${response.statusText}`);
    }
    return response.json() as Promise<WorldRanks.RankingTableData[]>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
