import { Link, useLoaderData } from "@tanstack/react-router";
import { latLng } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

import "leaflet/dist/leaflet.css";

export const CountryDetail = () => {
  const country = useLoaderData({ from: "/country/$code" });

  return (
    <div className="flex flex-col">
      <Link className="flex flex-row align-middle items-center gap-2" to="/">
        <ArrowLeftIcon className="h-4" />
        <p>Go Back</p>
      </Link>

      <div className="flex flex-col mx-auto items-center gap-4 mb-8">
        <img className="w-48" src={country.flags.png} alt="flag" />
        <p className="text-4xl font-bold">{country.name.common}</p>
        <div className="flex flex-col items-center">
          <p>Official name:</p>
          <p className="text-xl font-bold">{country.name.official}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Native name:</p>
          <p className="text-2xl font-bold">
            {Object.values(country.name.nativeName)
              .map((nativeName) => nativeName.common)
              .join(", ")}
          </p>
        </div>
      </div>
      <section className="grid grid-cols-1 w-full gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4 text-center items-center justify-center">
          <div>
            <p>Continent</p>
            <p className="text-2xl font-bold">{country.continents}</p>
          </div>
          <div>
            <p>Capital</p>
            <p className="text-2xl font-bold">{`${country.capital} (${country.capitalInfo.latlng})`}</p>
          </div>
          <div>
            <p>Official Languages</p>
            <p className="text-2xl font-bold">
              {" "}
              {Object.values(country.languages).join(", ")}
            </p>
          </div>
        </div>
        <MapContainer
          className="h-[400px]"
          center={latLng(country.latlng[0], country.latlng[1])}
          zoom={4}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={latLng(
              country.capitalInfo.latlng[0],
              country.capitalInfo.latlng[1],
            )}
          >
            <Popup>{country.capital}</Popup>
          </Marker>
        </MapContainer>
      </section>
    </div>
  );
};

export default CountryDetail;
