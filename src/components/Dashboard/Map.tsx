import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Loader from "../../Loader";
import toast from "react-hot-toast";

const fetchCovidData = async () => {
  //fetching the response from the api
  const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
  return data;
};

const Map = () => {
  //Getting the data, isLoading, isError values from useQuery.
  const { data, isLoading, error } = useQuery({
    queryKey: ["covidData"],
    queryFn: fetchCovidData,
  });

  //Displaying the loader
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  //Displaying the error
  if (error) {
    toast.error("Error while fetching the data from the api");
    return;
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-center font-bold text-2xl mb-4">
        COVID-19 Cases Map
      </h1>
      <MapContainer
        center={[20, 0]}
        zoom={3}
        className="w-full h-[80vh] rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((country: any) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <div>
                <h3 className="font-bold text-lg">{country.country}</h3>
                <p>Total Cases: {country.cases}</p>
                <p>Active Cases: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
