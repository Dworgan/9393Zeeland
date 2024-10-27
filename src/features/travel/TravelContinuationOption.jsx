import { useSelector } from "react-redux";
import {
  FormatHoursAndMinutes,
  GetHoursAndMinutes,
} from "../../utils/TimeFormat";
import { Card } from "../../components/Card";
import { BusIcon, TrainIcon } from "../../icons/Icons";

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
            {travelOption.vehicleType === "TRAIN" && (
              <TrainInfo iTravelOption={travelOption} />
            )}

            {travelOption.vehicleType === "BUS" && (
              <BusInfo iTravelOption={travelOption} />
            )}
          </div>
        ))}
    </Card>
  );
};

const TrainInfo = ({ iTravelOption }) => {
  return (
    <>
      <div>
        <TrainIcon />
      </div>
      <div className="flex1 details">
        <div>
          <div className="label">Platform Nmr</div>
          <div>{iTravelOption?.routeName}</div>
        </div>
        <div>
          <div className="label">Richting</div>
          <div>{iTravelOption?.destination}</div>
        </div>
        <div>
          <div className="label">Vertrektijd</div>
          <div>{FormatHoursAndMinutes(iTravelOption?.departureTime)}</div>
        </div>
      </div>
    </>
  );
};
const BusInfo = ({ iTravelOption }) => {
  return (
    <>
      <div>
        <BusIcon />
      </div>
      <div className="flex1 details">
        <div>
          <div className="label">Lijn Nmr</div>
          <div>{iTravelOption?.routeName}</div>
        </div>
        <div>
          <div className="label">Richting</div>
          <div>{iTravelOption?.destination}</div>
        </div>
        <div>
          <div className="label">Vertrektijd</div>
          <div>{FormatHoursAndMinutes(iTravelOption?.departureTime)}</div>
        </div>
      </div>
    </>
  );
};
