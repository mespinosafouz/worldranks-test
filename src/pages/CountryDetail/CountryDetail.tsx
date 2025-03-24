import { Link, useLoaderData, useParams } from "@tanstack/react-router";

export const CountryDetail = () => {
  const { code } = useParams({ from: "/country/$code" });
  const data = useLoaderData({ from: "/country/$code" });
  return (
    <>
      <Link to="/">{"<- Back"}</Link>
      <div>{`Hello "/country/${code}"!`} </div>
      <img src={data[0].flags.png} alt="flag" />
    </>
  );
};

export default CountryDetail;
