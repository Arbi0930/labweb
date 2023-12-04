import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const { countryName } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setMapCenter({ lat: data[0].latlng[0], lng: data[0].latlng[1] });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  const openGoogleMaps = () => {
    const [lat, lng] = country[0].latlng;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="country__info__wrapper">
      <button>
        <Link to="/">Буцах</Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      <div className="country__info__container">
        {country.map((country, index) => (
          <div key={index}>
            <div className="country__info-img">
              <img src={country.flags.png} alt="" />
            </div>

            <div className="country__info">
              <h3>{country.name.common}</h3>

              <div className="country__info-right">
                <h5>
                  Population:{" "}
                  <span>
                    {new Intl.NumberFormat().format(country.population)}
                  </span>
                </h5>
                <h5>Region: <span>{country.region}</span></h5>
                <h5>Sub Region: <span>{country.subregion}</span></h5>
                <h5>Capital: <span>{country.capital}</span></h5>
                <h5>AltSpellings: <span>{country.altSpellings}</span></h5>
                <h5>Timezones: <span>{country.timezones}</span></h5>
                <h5>Continents: <span>{country.continents}</span></h5>
                <h5>Start of week: <span>{country.startOfWeek}</span></h5>
                <h5>Area: <span>{country.area}</span>m3</h5>
                <h5>CCN3: <span>{country.ccn3}</span></h5>                
                <button onClick={openGoogleMaps}><h5>Coordinates:{" "}<span>{country.latlng[0]}, {country.latlng[1]}</span></h5></button>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default CountryInfo;
