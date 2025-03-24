import { createFileRoute } from "@tanstack/react-router";
import { CountryRanking } from "../pages";

export const Route = createFileRoute("/")({
  component: CountryRanking,
});
