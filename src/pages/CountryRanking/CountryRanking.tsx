import RankingHeader from "@components/CountryRanking/RankingHeader/RankingHeader";
import RankingDataTable from "@components/CountryRanking/RankingDataTable/RankingDataTable";

import { useCountryRanking } from "./useCountryRanking";

const CountryRanking = () => {
  const { rankingData, isFetching } = useCountryRanking();

  return (
    <>
      <RankingHeader countriesCount={rankingData.length ?? 0} />
      <RankingDataTable data={rankingData} isFetching={isFetching} />
    </>
  );
};

export default CountryRanking;
