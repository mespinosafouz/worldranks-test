import RankingHeader from "@components/CountryRanking/RankingHeader/RankingHeader";
import RankingDataTable from "@components/CountryRanking/RankingDataTable/RankingDataTable";

import { useCountryRanking } from "./useCountryRanking";

const CountryRanking = () => {
  const { rankingData } = useCountryRanking();

  return (
    <>
      <RankingHeader countriesCount={rankingData?.length ?? 0} />
      {rankingData ? <RankingDataTable data={rankingData} /> : null}
    </>
  );
};

export default CountryRanking;
