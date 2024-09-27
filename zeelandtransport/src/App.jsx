import { Button } from "./Components/Button";
import { Card, MainCard } from "./Components/Card";
import { ErrorMessage, InfoMessage } from "./Components/Feedback";
import Loader from "./Components/Loader";
import BookingOptions from "./features/Booking/BookingOptions";
import { FromToIcon, LocationMarker } from "./icons/icons";
import BasicLayout from "./Layout/BasicLayout";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

export const testBooking = [
  {
    validUntil: new Date().getDate(),
    options: [
      {
        id: "794c9d63-5992-41a2-8885-08dcd7d31bbc",
        from: {
          latitude: 51.493202,
          longitude: 3.616107,
          stopReferences: [],
        },
        to: {
          latitude: 51.49044,
          longitude: 3.630872,
          stopReferences: [],
        },
        departureTime: "2024-09-18T15:30:00+02:00",
        arrivalTime: "2024-09-18T15:34:48+02:00",
        customer: null,
      },
    ],
  },
];

export default function App() {
  const [appState, setAppState] = useState("destination");
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
  const [currentFromStation, setCurrentFromStation] = useState(null);
  const [currentDestinationStation, setCurrentDestinationStation] =
    useState(null);

  const [travelTime, setTravelTime] = useState(new Date().getTime());

  /*Station Selection */
  const [error, setError] = useState("");

  /* Travel Options */
  const [travelOptions, setTravelOptions] = useState(testBooking);
  const [currentTravelOption, setCurrentTravelOption] = useState(null);

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

  async function SetData() {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8080/stations`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("egerg");
      const data = await res.json();
      if (data.Response === "False") throw new Error("Stations not Found");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

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
    setCurrentFromStation(() => selectedStation);
  }

  function handleDestinationStation(selectedStation) {
    setDestinationStationQuery(selectedStation?.name);
    setFromStationSuggestions(false);
    setDestinationStationSuggestions(false);
    setCurrentDestinationStation(() => selectedStation);
  }

  function handleSelectTravelOption(selectedTraveloption) {
    setCurrentTravelOption(selectedTraveloption);
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
        <div className="display-flex flex-align-items-center">
          {appState === "destination" && <FilterLocationsresults />}
          {appState === "traveloptions" && (
            <BookingOptions
              travelOptions={travelOptions}
              selectedTravelOption={currentTravelOption}
              handleSelectTravelOption={handleSelectTravelOption}
            />
          )}
        </div>
        <>
          {!showDestinationStationSuggestions &
          !showFromStationSuggestions &
          !isLoading &
          (appState === "destination") &
          ((fromStationQuery.length > 0) &
            (destinationStationQuery.length > 0)) ? (
            <div className="button-container">
              <Button size={"big"} onClick={() => getTravelOptions()}>
                Plan
              </Button>
            </div>
          ) : (
            ""
          )}
          {currentTravelOption !== null && (
            <div className="button-container">
              <Button size={"big"}>Book</Button>
            </div>
          )}
        </>
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

  function FilterLocationsresults() {
    return (
      <>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} key={error} />}
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
      </>
    );
  }
  async function getTravelOptions() {
    setTravelTime(() =>
      new Date().getTime().toLocaleString("en-US", {
        timeZone: "Europe/Amsterdam",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    var x = JSON.stringify({
      from: {
        latitude: currentFromStation.latitude,
        longitude: currentFromStation.longitude,
        stopReferences: [],
      },
      to: {
        latitude: currentDestinationStation.latitude,
        longitude: currentDestinationStation.longitude,
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
      transportationModes: [],
    });
    console.log(x);

    console.log(currentFromStation);
    try {
      setIsLoading(true);
      const url = "http://localhost:8080/planning/offers";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: x,
      });

      if (!res.ok) throw new Error("Er zijn geen reis opties gevonden");
      const data = await res.json();
      if (data.Response === "False")
        throw new Error("Er zijn geen reis opties gevonden");
      console.log(data);
      //setTravelOptions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setAppState("traveloptions");
    }
  }

  async function setBooking() {
    var b = {
      id: "794c9d63-5992-41a2-8885-08dcd7d31bbc",
      from: {
        latitude: 51.493202,
        longitude: 3.616107,
        stopReferences: [],
      },
      to: {
        latitude: 51.49044,
        longitude: 3.630872,
        stopReferences: [],
      },
      departureTime: "2024-09-18T15:30:00+02:00",
      arrivalTime: "2024-09-18T15:34:48+02:00",
      customer: null,
    };
    try {
      setIsLoading(true);
      const url = "http://localhost:8080/planning/offers";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: b,
      });

      if (!res.ok) throw new Error("Booking is niet gelukt");
      const data = await res.json();
      if (data.Response === "False") throw new Error("Booking is niet gelukt");
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
}
