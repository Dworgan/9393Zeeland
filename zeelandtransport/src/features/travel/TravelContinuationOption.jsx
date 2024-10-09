import { useSelector } from "react-redux";
import { GetHoursAndMinutes } from "../../utils/TimeFormat";
import { Card } from "../../components/Card";
import { BoatIcon, BusIcon, TrainIcon } from "../../icons/Icons";

export const TravelContinuationOptionCard = () => {
  const toStation = useSelector((state) => state.plan.toStation);
  const travelOptions = useSelector(
    (state) => state.booking.listOfTravelOptions
  );
  return (
    <Card title={"Reis Opties bij " + toStation.name}>
      {travelOptions.tripContinuationOptions.length === 0 &&
        "Er zijn geen reisopties beschikbaar."}
      {travelOptions.tripContinuationOptions.length > 0 &&
        travelOptions.tripContinuationOptions.map((travelOption) => (
          <div className={"default-detail "}>
            <div>
              {travelOption.vehicleType === "BUS" && <BusIcon />}
              {travelOption.vehicleType === "VEERDIENST" && <BoatIcon />}
              {travelOption.vehicleType === "Intercity" && <TrainIcon />}
            </div>
            <div className="flex1 details">
              <div>
                <div className="label">Lijn Nmr</div>
                <div>{travelOption.laneNumber}</div>
              </div>
              <div>
                <div className="label">Richting</div>
                <div>{travelOption.destination}</div>
              </div>
              <div>
                <div className="label">Vertrektijd</div>
                <div>{GetHoursAndMinutes(travelOption.departureTime)}</div>
              </div>
            </div>
          </div>
        ))}
    </Card>
  );
};
