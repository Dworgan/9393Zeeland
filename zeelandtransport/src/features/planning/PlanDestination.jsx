import { useDispatch, useSelector } from "react-redux";
import { Card, MainCard } from "../../components/Card";
import { FromToIcon, LocationMarker } from "../../icons/Icons";
import { TravelFilter } from "../../components/TravelFilter";
import { TravelTime } from "../../components/TravelTime";
import {
  setFromQuery,
  setFromStation,
  setListOfStations,
  setPlanningState,
  setToQuery,
  setToStation,
} from "./PlanSlice";
import { useEffect, useState } from "react";
import { InfoMessage } from "../../components/Feedback";
import { Button } from "../../components/Button";
import { setListOfTravelOptions } from "../booking/BookingSlice";
import { setAppState } from "../../AppSlice";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import DatePicker from "../../components/TravelDatePicker";
import ErrorMessage from "../../components/feedback/ErrorMessage";
const errorObj = {
  title: "",
  message: "",
  show: false,
};

export default function PlanDestination() {
  const dispatch = useDispatch();
  const planningState = useSelector((state) => state.plan.planningState);
  const [errorMessage, setErrorMessage] = useState(errorObj);
  /* Station data */

  useEffect(
    function () {
      async function fetchData() {
        try {
          const res = await fetch(`http://localhost:8080/stations`);
          if (!res.ok)
            throw new Error("Helaas konden er geen stations ingeladen worden");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Stations not Found");
          dispatch(setListOfStations(data));
        } catch (err) {
          setErrorMessage(err);
        } finally {
        }
      }
      fetchData();
    },
    [dispatch]
  );

  return (
    <>
      <DestinationCard planningState={planningState} />
      <FilterLocationsresults />
      {planningState === "planFilter" && <PlanTrip />}
    </>
  );
}

const DestinationCard = ({ planningState }) => {
  /* When sation is selected update input field */
  const fromStation = useSelector((state) => state.plan.fromStationQuery);
  const toStation = useSelector((state) => state.plan.toStationQuery);

  /* Update station search query */
  const dispatch = useDispatch();
  function searchFromStation(query) {
    dispatch(setFromQuery(query));
  }
  function searchToStation(query) {
    dispatch(setToQuery(query));
  }

  return (
    <>
      <MainCard>
        <form className="form-destination">
          <div>
            <FromToIcon />
          </div>
          <div className="flex1 display-flex flex-direction-column">
            <InputField
              placeHolder={"Van"}
              type={"text"}
              value={fromStation}
              onChange={(e) => searchFromStation(e.target.value)}
              showClearButton={fromStation !== ""}
              onClearButton={() => searchFromStation("")}
            />
            <InputField
              placeHolder={"Naar"}
              type={"text"}
              value={toStation}
              onChange={(e) => searchToStation(e.target.value)}
              showClearButton={toStation !== ""}
              onClearButton={() => searchToStation("")}
            />
          </div>
        </form>
        {planningState === "planFilter" && (
          <>
            <div className="margin-top-base">
              <TravelFilter />
            </div>
            <div className="margin-top-base">
              <DatePicker />
            </div>
            <div className="margin-top-base">
              <TravelTime />
            </div>
          </>
        )}
      </MainCard>
    </>
  );
};

const FilterLocationsresults = () => {
  const planningState = useSelector((state) => state.plan.planningState);
  const stationFromList = useSelector((state) => state.plan.fromStationsList);
  const stationToList = useSelector((state) => state.plan.toStationsList);

  const dispatch = useDispatch();
  function handleSetFromStation(station) {
    dispatch(setFromStation(station));
  }
  function handleSetToStation(station) {
    dispatch(setToStation(station));
  }
  return (
    <>
      {planningState === "planFrom" && (
        <Card title={"Vertrek locaties"}>
          {stationFromList.length === 0 ? (
            <InfoMessage message={"Geen stations gevonden"} />
          ) : (
            stationFromList.map((station) => (
              <FilteredStation
                station={station}
                key={station._id}
                onClick={() => handleSetFromStation(station)}
              />
            ))
          )}
        </Card>
      )}
      {planningState === "planTo" && (
        <Card title={"Aankomst locaties"}>
          {stationToList.length === 0 ? (
            <InfoMessage message={"Geen stations gevonden"} />
          ) : (
            stationToList.map((station) => (
              <FilteredStation
                station={station}
                key={station._id}
                onClick={() => handleSetToStation(station)}
              />
            ))
          )}
        </Card>
      )}
    </>
  );
};

const FilteredStation = ({ station, onClick }) => {
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
};

const PlanTrip = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fromStation = useSelector((state) => state.plan.fromStation);
  const toStation = useSelector((state) => state.plan.toStation);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function GetTravelOptions() {
    setIsLoading(true);
    const tTravelOptions = await getTravelOptions(fromStation, toStation);
    dispatch(setListOfTravelOptions(tTravelOptions));

    dispatch(setPlanningState("planDone"));
    dispatch(setAppState("appBookingOptions"));
    setIsLoading(false);
    navigate("/BookingOptions");
  }

  return (
    <div className="button-container">
      <Button
        size={"big"}
        onClick={() => GetTravelOptions()}
        isLoading={isLoading}
      >
        Plan
      </Button>
    </div>
  );

  async function getTravelOptions(fromStation, toStation) {
    var x = JSON.stringify({
      from: {
        latitude: fromStation.latitude,
        longitude: fromStation.longitude,
        stopReferences: [],
      },
      to: {
        latitude: toStation.latitude,
        longitude: toStation.longitude,
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
    try {
      // setIsLoading(true);
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
      return data;
    } catch (err) {
      //setError(err.message);
    }
  }
};
