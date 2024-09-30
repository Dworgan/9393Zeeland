import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { TravelIcon } from "../../icons/icons";

export default function BookingOptions({
  travelOptions,
  selectedTravelOption,
  handleSelectTravelOption,
}) {
  return (
    <>
      <Card title={"Reis Opties"}>
        {travelOptions.options.length === 0 &&
          "Er zijn geen reisopties beschikbaar."}
        {travelOptions.options.length > 0 &&
          travelOptions.options.map((travelOption) => (
            <div
              className={
                "travel-option " +
                (travelOption === selectedTravelOption ? "selected" : "")
              }
              onClick={() => handleSelectTravelOption(travelOption)}
            >
              <div>
                <TravelIcon />
              </div>
              <div className="flex1 details">
                <div>
                  <div className="title">Vertrek </div>
                  <div>{travelOption.departureTime}</div>
                </div>
                <div>
                  <div className="title">Aankomst</div>
                  <div>{travelOption.arrivalTime}</div>
                </div>
                <div>
                  <div className="title">Prijs</div>
                  <div>3,50</div>
                </div>
              </div>
            </div>
          ))}
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
