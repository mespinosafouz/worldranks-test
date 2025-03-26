import { Link } from "@tanstack/react-router";
import { latLng } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

import "leaflet/dist/leaflet.css";
import { useCountryDetail } from "./useCountryDetail";
import BorderCountry from "src/components/CountryDetail/BorderCountry";

export const CountryDetail = () => {
  const { countryData } = useCountryDetail();

  return (
    <div className="flex flex-col">
      <Link className="flex flex-row align-middle items-center gap-2" to="/">
        <ArrowLeftIcon className="h-4" />
        <p>Go Back</p>
      </Link>

      <div className="flex flex-col mx-auto items-center gap-4 mb-8">
        <img className="w-48" src={countryData.flags.png} alt="flag" />
        <p className="text-4xl font-bold">{countryData.name.common}</p>
        <div className="flex flex-col items-center">
          <p>Official name:</p>
          <p className="text-xl font-bold">{countryData.name.official}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Native name:</p>
          <p className="text-2xl font-bold">
            {Object.values(countryData.name.nativeName)
              .map((nativeName) => nativeName.common)
              .join(", ")}
          </p>
        </div>
      </div>
      <section className="grid grid-cols-1 w-full gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4 text-center items-center justify-center">
          <div>
            <p>Continent</p>
            <p className="text-2xl font-bold">{countryData.continents}</p>
          </div>
          <div>
            <p>Capital</p>
            <p className="text-2xl font-bold">{`${countryData.capital} (${countryData.capitalInfo.latlng})`}</p>
          </div>
          <div>
            <p>Official Languages</p>
            <p className="text-2xl font-bold">
              {Object.values(countryData.languages).join(", ")}
            </p>
          </div>
          <div>
            <p>Borders</p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {countryData.borders.map((countryCode) => (
                <BorderCountry countryCode={countryCode} />
              ))}
            </div>
          </div>
        </div>
        <MapContainer
          className="h-[400px]"
          center={latLng(countryData.latlng[0], countryData.latlng[1])}
          zoom={4}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={latLng(
              countryData.capitalInfo.latlng[0],
              countryData.capitalInfo.latlng[1],
            )}
          >
            <Popup>{countryData.capital}</Popup>
          </Marker>
        </MapContainer>
      </section>
    </div>
  );
};

export default CountryDetail;
