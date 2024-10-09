import DisplayPlanning from '../planning/DisplayPlanning';
import { TravelContinuationOptionCard } from '../travel/TravelContinuationOption';

export default function BookingOptions() {
  return (
    <>
      <DisplayPlanning>
        <div className='h3 margin-bottom-base'>Uw reis is bevestigd</div>
      </DisplayPlanning>
      <TravelContinuationOptionCard />
    </>
  );
}
