import { Card } from "../../Components/Card";
import { TravelIcon } from "../../icons/icons";

export default function BookingOptions({ travelOptions }) {
  return (
    <>
      <Card title={"Reis Opties"}>
        {travelOptions.length === 0 && "Er zijn geen reisopties beschikbaar."}
        {travelOptions.length > 0 &&
          travelOptions.map((travelOption) => (
            <div className="travel-option">
              <div>
                <TravelIcon />
              </div>
              <div className="flex1 details">
                <div>
                  <div className="title">Vertrek </div>
                  <div>00:00</div>
                </div>
                <div>
                  <div className="title">Aankomst</div>
                  <div>00:00</div>
                </div>
                <div>
                  <div className="title">Prijs</div>
                  <div>3,50</div>
                </div>
              </div>
            </div>
          ))}
        <testCmp />
      </Card>
    </>
  );
}

function testCmp() {
  return <h1>hi</h1>;
}

function travelOptionCard() {
  return (
    <div className="travel-option">
      <div>
        <TravelIcon />
      </div>
      <div className="flex1">
        <div>
          <div className="title">Vertrek </div>
          <div></div>
        </div>
        <div>
          <div className="title">Aankomst</div>
          <div></div>
        </div>
        <div>
          <div className="title">Prijs</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
