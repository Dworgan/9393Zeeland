import { useDispatch, useSelector } from 'react-redux';
import { Card, MainCard } from '../../components/Card';
import { FromToIcon, LocationMarker } from '../../icons/icons';
import { TravelFilter } from '../../components/travelfilter';
import { DatePicker } from '../../components/datepicker';
import { TravelTime } from '../../components/traveltime';
import {
  setFromQuery,
  setFromStation,
  setListOfStations,
  setToQuery,
  setToStation,
} from './planSlice';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { ErrorMessage, InfoMessage } from '../../components/Feedback';

export default function PlanDestination() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  /* Station data */
  const [stations, setStations] = useState([]);
  const [error, setError] = useState('');

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8080/stations`);
        if (!res.ok)
          throw new Error('Helaas konden er geen stations ingeladen worden');
        const data = await res.json();
        if (data.Response === 'False') throw new Error('Stations not Found');
        dispatch(setListOfStations(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <MainCard>
      <DestinationCard />
      <FilterLocationsresults />
    </MainCard>
  );
}
const DestinationCard = () => {
  const planningState = useSelector((state) => state.plan.planningState);
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
      <form className='form-destination'>
        <div>
          <FromToIcon />
        </div>
        <div className='flex1 display-flex flex-direction-column'>
          <input
            placeholder='Van'
            type='text'
            value={fromStation}
            onChange={(e) => searchFromStation(e.target.value)}
            key={1}
          ></input>
          <input
            placeholder='Naar'
            type='text'
            value={toStation}
            onChange={(e) => searchToStation(e.target.value)}
            key={2}
          ></input>
        </div>
      </form>

      {planningState === 'planFilter' && (
        <>
          <div className='margin-top-base'>
            <TravelFilter />
          </div>
          <div className='margin-top-base'>
            <TravelTime />
          </div>
        </>
      )}
    </>
  );
};

const FilterLocationsresults = () => {
  const planningState = useSelector((state) => state.plan.planningState);
  const stationFromList = useSelector((state) => state.plan.fromStationsList);
  const stationToList = useSelector((state) => state.plan.fromStationsList);

  const dispatch = useDispatch();
  function handleSetFromStation(station) {
    dispatch(setFromStation(station));
  }
  function handleSetToStation(station) {
    dispatch(setToStation(station));
  }
  return (
    <>
      {planningState === 'planFrom' && (
        <Card title={'Vertrek locaties'}>
          {stationFromList.length === 0 ? (
            <InfoMessage message={'Geen stations gevonden'} />
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
      {planningState === 'planTo' && (
        <Card title={'Aankomst locaties'}>
          {stationToList.length === 0 ? (
            <InfoMessage message={'Geen stations gevonden'} />
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
    <div className='content' onClick={onClick}>
      <div>
        <LocationMarker />
      </div>
      <div className='flex1'>
        {station.name + '  ' + (station.city !== null ? station.city : '')}{' '}
      </div>
    </div>
  );
};
