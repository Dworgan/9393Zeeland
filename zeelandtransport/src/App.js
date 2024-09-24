import { Button } from "./Components/Button";
import { Card, MainCard } from "./Components/Card";
import { ErrorMessage } from "./Components/Feedback";
import Loader from "./Components/Loader";
import { LocationMarker } from "./icons/icons";
import BasicLayout from "./Layout/BasicLayout";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import Navigation from "./Layout/Navigation";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  /*Station Lists */
  const [stations, setStations] = useState([]);
  const [fromStations, setFromStations] = useState([]);
  const [destinationStations, setDestinationStations] = useState([]);
  const [fromStationQuery, setFromStationQuery] = useState("");
  const [destinationStationQuery, setDestinationStationQuery] = useState("");

  /*Station Selection */
  const [fromStation, setFromStation] = useState();
  const [destinationStation, setDestinationStation] = useState();
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8080/stations`);
        if (!res.ok)
          throw new Error("Helaas konden er geen stations ingeladen worden");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Stations not Found");
        setStations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  function SearchFromStation(query) {
    setDestinationStationQuery("");
    setFromStationQuery(query);
    setIsLoading(true);
    let result = [];
    result = stations.filter(
      (station) => station.name.includes(query) && [...result, station.name]
    );
    setFromStations(result);
    setIsLoading(false);
  }

  function SearchDestinationStation(query) {
    setFromStationQuery("");
    setDestinationStationQuery(query);
    setIsLoading(true);
    let result = [];
    result = stations.filter(
      (station) => station.name.includes(query) && [...result, station.name]
    );
    setDestinationStations(result);
    setIsLoading(false);
  }

  function handleSetFromStation({ station }) {
    setFromStation(station);
  }

  return (
    <div className="App">
      <BasicLayout>
        <div>
          <MainCard>
            <form className="form-destination">
              <input
                placeholder="Van"
                type="text"
                onChange={(e) => SearchFromStation(e.target.value)}
              ></input>
              <input
                placeholder="Naar"
                type="text"
                onChange={(e) => SearchDestinationStation(e.target.value)}
              ></input>
            </form>
          </MainCard>
        </div>
        <div>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {fromStationQuery.length > 0 && (
            <Card title={"Vertrek locaties"}>
              {fromStations.map((station) => (
                <FilteredDestination station={station} key={fromStations._id} />
              ))}
            </Card>
          )}

          {destinationStationQuery.length > 0 && (
            <Card title={"Aankomst locaties"}>
              {destinationStations.map((station) => (
                <FilteredDestination
                  station={station}
                  key={destinationStations._id}
                />
              ))}
            </Card>
          )}
        </div>
      </BasicLayout>
    </div>
  );

  function FilteredDestination({ station }) {
    return (
      <div
        className="content"
        onClick={() => console.log("Clicked on station")}
      >
        <div>
          <LocationMarker />
        </div>
        <div className="flex1">
          {" "}
          {station.name +
            "  " +
            (station.city !== null ? station.city : "")}{" "}
        </div>
      </div>
    );
  }
}
