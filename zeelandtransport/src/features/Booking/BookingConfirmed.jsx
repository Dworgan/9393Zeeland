import { useSelector } from "react-redux";
import DisplayPlanning from "../planning/DisplayPlanning";
import { TravelContinuationOptionCard } from "../travel/TravelContinuationOption";

export default function BookingOptions() {
  const ticket = useSelector((state) => state.booking.confirmedTravelOption);
  return (
    <>
      <DisplayPlanning>
        <div className="h3 margin-bottom-base margin-bottom-base text-align-center">
          Uw reis is bevestigd
        </div>
        <div className="h2 margin-bottom-base text-align-center color-primary-120">
          {ticket.legs[0].ticket.tokenData.url}
        </div>
      </DisplayPlanning>
      <TravelContinuationOptionCard />
    </>
  );
}
