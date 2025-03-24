import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "@api/utils";

export const useCountryRanking = () => {
  const { data: rankingData } = useQuery({
    queryKey: ["rankingData"],
    queryFn: async () => await fetchCountries(),
  });

  return {
    rankingData,
  };
};
