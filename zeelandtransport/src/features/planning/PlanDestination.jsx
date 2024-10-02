import { useDispatch, useSelector } from 'react-redux';
import { MainCard } from '../../components/Card';
import { FromToIcon } from '../../icons/icons';
import { TravelFilter } from '../../components/travelfilter';
import { DatePicker } from '../../components/datepicker';
import { TravelTime } from '../../components/traveltime';
import { setFromQuery } from './planSlice';
import { useState } from 'react';

export default function PlanDestination() {
  //console.log(planning);
  //const planning = useSelector((rootStore) => rootStore.plan.fromStationQuery);
  const [fromStationQuery, setFromStationQuery] = useState('test');
  const [destinationStationQuery, setDestinationStationQuery] = useState('');

  return (
    <MainCard>
      <DestinationCard />
    </MainCard>
  );
}
const DestinationCard = () => {
  const dispatch = useDispatch();

  function searchFromStation(query) {
    //setFromStationQuery(query);
    dispatch(setFromQuery(query));
  }
  return (
    <>
      <div className='form-destination'>
        <div>
          <FromToIcon />
        </div>
        <div className='flex1 display-flex flex-direction-column'>
          <input
            placeholder='Van'
            type='text'
            //value={planning?.fromStationQuery}
            onChange={(e) => searchFromStation(e.target.value)}
          ></input>
          <input
            placeholder='Naar'
            type='text'
            //value={planning.toStation}
            // onChange={(e) => SearchDestinationStation(e.target.value)}
          ></input>
        </div>
      </div>
    </>
  );
};
