import { Button } from "./Components/Button";
import { Card, MainCard } from "./Components/Card";
import { ErrorMessage, InfoMessage } from "./Components/Feedback";
import Loader from "./Components/Loader";
import { FromToIcon, LocationMarker } from "./icons/icons";
import BasicLayout from "./Layout/BasicLayout";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  /*Station Lists */
  const [stations, setStations] = useState([]);
  const [showFromStationSuggestions, setFromStationSuggestions] =
    useState(false);
  const [showDestinationStationSuggestions, setDestinationStationSuggestions] =
    useState(false);
  const [fromStations, setFromStations] = useState([]);
  const [destinationStations, setDestinationStations] = useState([]);
  const [fromStationQuery, setFromStationQuery] = useState("");
  const [destinationStationQuery, setDestinationStationQuery] = useState("");
  let currentSelectedFromStation = null;
  let currentSelectedDestinationStation = null;

  const [travelTime, setTravelTime] = useState(new Date().getTime());

  /*Station Selection */
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
    setFromStationSuggestions(true);
    setDestinationStationSuggestions(false);
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
    setDestinationStationQuery(query);
    setDestinationStationSuggestions(true);
    setIsLoading(true);
    let result = [];
    result = stations.filter(
      (station) => station.name.includes(query) && [...result, station.name]
    );
    setDestinationStations(result);
    setIsLoading(false);
  }

  function handleSetFromStation(selectedStation) {
    setFromStationQuery(selectedStation?.name);
    setFromStationSuggestions(false);
    setDestinationStationSuggestions(false);
    currentSelectedFromStation = selectedStation;
    console.log(currentSelectedFromStation.longitude);
  }

  function handleDestinationStation(selectedStation) {
    setDestinationStationQuery(selectedStation?.name);
    setFromStationSuggestions(false);
    setDestinationStationSuggestions(false);
    currentSelectedDestinationStation = selectedStation;
  }

  return (
    <div className="App">
      <BasicLayout>
        <div>
          <MainCard>
            <form className="form-destination">
              <div>
                <FromToIcon />
              </div>
              <div className="flex1 display-flex flex-direction-column">
                <input
                  placeholder="Van"
                  type="text"
                  value={fromStationQuery}
                  onChange={(e) => SearchFromStation(e.target.value)}
                ></input>
                <input
                  placeholder="Naar"
                  type="text"
                  value={destinationStationQuery}
                  onChange={(e) => SearchDestinationStation(e.target.value)}
                ></input>
              </div>
            </form>
          </MainCard>
        </div>
        <div>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {showFromStationSuggestions && (
            <Card title={"Vertrek locaties"}>
              {fromStations.length === 0 ? (
                <InfoMessage message={"Geen stations gevonden"} />
              ) : (
                fromStations.map((station) => (
                  <FilteredStation
                    station={station}
                    key={fromStations._id}
                    onClick={() => handleSetFromStation(station)}
                  />
                ))
              )}
            </Card>
          )}

          {showDestinationStationSuggestions && (
            <Card title={"Aankomst locaties"}>
              {destinationStations.length === 0 ? (
                <InfoMessage message={"Geen stations gevonden"} />
              ) : (
                destinationStations.map((station) => (
                  <FilteredStation
                    station={station}
                    key={destinationStations._id}
                    onClick={() => handleDestinationStation(station)}
                  />
                ))
              )}
            </Card>
          )}
        </div>
        <div>
          {!showDestinationStationSuggestions &
            !showFromStationSuggestions &
            (fromStationQuery.length > 0) &
            (destinationStationQuery.length > 0) && (
            <Button onClick={() => getTravelOptions()}>Test</Button>
          )}
        </div>
      </BasicLayout>
    </div>
  );

  function FilteredStation({ station, onClick }) {
    return (
      <div className="content" onClick={onClick}>
        <div>
          <LocationMarker />
        </div>
        <div className="flex1">
          {station.name + "  " + (station.city !== null ? station.city : "")}{" "}
        </div>
      </div>
    );
  }

  async function getTravelOptions() {
    try {
      setTravelTime(() => new Date().getTime());
      setIsLoading(true);
      const url = "http://localhost:8080/planning/offers";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: {
            latitude: currentSelectedFromStation.latitude,
            longitude: currentSelectedFromStation.longitude,
            stopReferences: [],
          },
          to: {
            latitude: currentSelectedDestinationStation.latitude,
            longitude: currentSelectedDestinationStation.longitude,
            stopReferences: [],
          },
          travelers: 1,
          abilities: [],
          customer: {
            id: "12345",
            email: "johndoe@example.com",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234567890",
          },
          departureTime: travelTime,
          transportationModes: [],
        }),
      });

      if (!res.ok)
        throw new Error("Helaas konden er geen stations ingeladen worden");
      const data = await res.json();
      if (data.Response === "False")
        throw new Error("Er zijn geen reis opties gevonden");
      console.log("got data " + data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
}
