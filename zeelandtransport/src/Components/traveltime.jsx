import { Button } from "./Button";

export function TravelTime() {
  return (
    <div className="display-flex  flex-align-items-center">
      <div className="flex1">
        <Button size={"small"}>Vertrek</Button>
      </div>
      <div className="flex1 h3 text-align-center">Nu</div>
    </div>
  );
}
