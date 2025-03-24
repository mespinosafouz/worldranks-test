import { createFileRoute } from "@tanstack/react-router";
import CountryDetail from "@pages/CountryDetail/CountryDetail";
import { fetchCountry } from "@api/utils";

export const Route = createFileRoute("/country/$code")({
  component: CountryDetail,
  loader: async ({ params }) => {
    return await fetchCountry(params.code);
  },
});
