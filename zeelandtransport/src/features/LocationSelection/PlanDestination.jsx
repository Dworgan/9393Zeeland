import { MainCard } from "../../components/Card";
import { FromToIcon } from "../../icons/icons";

export default function PlanDestination() {
  return <DestinationCard />;

  function DestinationCard({
    fromStationQuery,
    destinationStationQuery,
    onHandleSearchFrom,
    onHandleSearchDestination,
  }) {
    return (
      <div>
        <MainCard>
          <form className="form-destination">
            <div>
              <FromToIcon />
            </div>
            <div className="flex1 display-flex flex-direction-column">
              <input
                placeholder="Van"
                type="text"
                value={fromStationQuery}
                onChange={onHandleSearchFrom}
              ></input>
              <input
                placeholder="Naar"
                type="text"
                value={destinationStationQuery}
                onChange={(e) => onHandleSearchDestination(e.target.value)}
              ></input>
            </div>
          </form>
        </MainCard>
      </div>
    );
  }
}
