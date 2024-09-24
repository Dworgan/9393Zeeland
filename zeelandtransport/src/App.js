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
  const [stations, setStations] = useState([]);
  const [fromStationQuery, setFromStation] = useState("");
  const [destinationStationQuery, setDestinationStation] = useState("");
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

  return (
    <div className="App">
      <BasicLayout>
        <div>
          <MainCard>
            <form className="form-destination">
              <input
                placeholder="Van"
                type="text"
                onChange={(e) => setFromStation(e.target.value)}
              ></input>
              <input
                placeholder="Naar"
                type="text"
                onChange={(e) => setDestinationStation(e.target.value)}
              ></input>
            </form>
          </MainCard>
        </div>
        <div>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}

          <Card title={"Vertrek locaties"}>
            {stations.map((station) => (
              <FilteredDestination station={station} key={station._id} />
            ))}
          </Card>
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
