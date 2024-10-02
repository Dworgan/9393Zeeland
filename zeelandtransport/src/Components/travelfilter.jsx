import { BicycleIcon, BusIcon, TaxiIcon, TrainIcon } from "../icons/icons";
import { Button } from "./Button";

export function TravelFilter() {
  return (
    <div className="display-flex justify-content-space-between">
      <Button size={"small"}>
        <TaxiIcon />
      </Button>
      <Button size={"small"} disabled={true}>
        <BicycleIcon />
      </Button>
      <Button size={"small"} disabled={true}>
        <TrainIcon />
      </Button>
      <Button size={"small"} disabled={true}>
        <BusIcon />
      </Button>
    </div>
  );
}
