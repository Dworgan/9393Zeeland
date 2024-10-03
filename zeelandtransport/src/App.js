import { Card, MainCard } from './components/Card';
import BasicLayout from './layout/BasicLayout';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import PlanDestination from './features/planning/PlanDestination';

export const testBooking = [
  {
    validUntil: new Date().getDate(),
    options: [
      {
        id: '794c9d63-5992-41a2-8885-08dcd7d31bbc',
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
        departureTime: '2024-09-18T15:30:00+02:00',
        arrivalTime: '2024-09-18T15:34:48+02:00',
        customer: null,
      },
    ],
  },
];

export default function App() {
  const [appState, setAppState] = useState('destination');
  const [destinationState, setDestinationState] = useState('planning');

  /*Station Lists */

  const [showFromStationSuggestions, setFromStationSuggestions] =
    useState(false);
  const [showDestinationStationSuggestions, setDestinationStationSuggestions] =
    useState(false);
  const [fromStations, setFromStations] = useState([]);
  const [destinationStations, setDestinationStations] = useState([]);
  const [fromStationQuery, setFromStationQuery] = useState('');
  const [destinationStationQuery, setDestinationStationQuery] = useState('');
  const [currentFromStation, setCurrentFromStation] = useState(null);
  const [currentDestinationStation, setCurrentDestinationStation] =
    useState(null);

  const [travelTime, setTravelTime] = useState(new Date().getTime());

  /*Station Selection */

  /* Travel Options */
  const [travelOptions, setTravelOptions] = useState();
  const [currentTravelOption, setCurrentTravelOption] = useState(null);

  /* Booking Info */
  const [travelBooking, setTravelBooking] = useState();

  function SearchFromStation(query) {
    setFromStationSuggestions(true);
    setDestinationStationSuggestions(false);
    setFromStationQuery(query);
    // setIsLoading(true);
    // let result = [];
    // result = stations.filter(
    //   (station) => station.name.includes(query) && [...result, station.name]
    // );
    //  setFromStations(result);
    // setIsLoading(false);
  }

  function SearchDestinationStation(query) {
    setDestinationStationQuery(query);
    setDestinationStationSuggestions(true);
    // setIsLoading(true);
    // let result = [];
    // result = stations.filter(
    //   (station) => station.name.includes(query) && [...result, station.name]
    // );
    //setDestinationStations(result);
    // setIsLoading(false);
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
    <div className='App'>
      <BasicLayout>
        <PlanDestination />
      </BasicLayout>
    </div>
  );

  function DisplayBookedInfo() {
    return (
      <MainCard title={''}>
        <div>
          <h1>Booking</h1>
          <h4>{travelBooking?.departureTime}</h4>
        </div>
      </MainCard>
    );
  }

  async function getTravelOptions() {
    setTravelTime(() =>
      new Date().getTime().toLocaleString('en-US', {
        timeZone: 'Europe/Amsterdam',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
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
        id: '12345',
        email: 'johndoe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890',
      },
      transportationModes: [],
    });
    console.log(x);

    console.log(currentFromStation);
    try {
      // setIsLoading(true);
      const url = 'http://localhost:8080/planning/offers';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: x,
      });

      if (!res.ok) throw new Error('Er zijn geen reis opties gevonden');
      const data = await res.json();
      if (data.Response === 'False')
        throw new Error('Er zijn geen reis opties gevonden');
      console.log(data);
      setTravelOptions(data);
    } catch (err) {
      //setError(err.message);
    } finally {
      //setIsLoading(false);
      setDestinationState('traveloptions');
    }
  }

  async function setBooking() {
    var b = {
      id: 'df5a2387-2a97-4286-d419-08dcdee6d1c3',
      from: {
        latitude: 51.330444,
        longitude: 3.498376,
        stopReferences: [],
      },
      to: {
        latitude: 51.396683,
        longitude: 3.551355,
        stopReferences: [],
      },
      departureTime: '2024-09-27T15:00:00+02:00',
      arrivalTime: '2024-09-27T15:19:08+02:00',
      customer: null,
    };
    try {
      //setIsLoading(true);
      const url = 'http://localhost:8080/bookings';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(b),
      });

      if (!res.ok) throw new Error('Booking is niet gelukt');
      const data = await res.json();
      if (data.Response === 'False') throw new Error('Booking is niet gelukt');
      console.log(data);
      confirmBooking(data.id);
    } catch (err) {
      //setError(err.message);
    } finally {
      // setIsLoading(false);
    }
  }
  async function confirmBooking(id) {
    try {
      const url = `http://localhost:8080/bookings/${id}/events`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'COMMIT',
          origin: 'TO',
        }),
      });
      if (!res.ok) throw new Error('Booking is niet bevestigt');
      const data = await res.json();
      console.log('Booking success');
      if (data.Response === 'False')
        throw new Error('Booking is niet bevestigt');
      setTravelBooking(data);
    } catch (err) {
      //setError(err.message);
    } finally {
      //setIsLoading(false);
    }
    setAppState('bookingconfirmed');
  }
}

/* {(() => {
          switch (appState) {
            case "destination":
              return ;
            case "bookingconfirmed":
              return <DisplayBookedInfo />;

            default:
              return null;
          }
        })()}

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
          (destinationState === "planning") &
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
              <Button size={"big"} onClick={() => setBooking()}>
                Book
              </Button>
            </div>
          )}
        </> */
