import BasicLayout from "./layout/BasicLayout";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import PlanDestination from "./features/planning/PlanDestination";
import { useSelector } from "react-redux";
import BookingOptions from "./features/booking/BookingOptions";
import BookingConfirmed from "./features/booking/BookingConfirmed";

export default function App() {
  const appState = useSelector((state) => state.app.appState);

  return (
    <div className="App">
      <BasicLayout>
        {appState === "appPlanning" && <PlanDestination />}
        {appState === "appBookingOptions" && <BookingOptions />}
        {appState === "appTravelConfirmation" && <BookingConfirmed />}
      </BasicLayout>
    </div>
  );
}

/* {(() => {
          switch (appState) {
            case "destination":
              return ;
            case "bookingconfirmed":
              return <DisplayBookedInfo />;

            default:
              return null;
          }
        })()}

        <div className="display-flex flex-align-items-center">
          {appState === "destination" && <FilterLocationsresults />}
          {appState === "traveloptions" && (
            <BookingOptions
              travelOptions={travelOptions}
              selectedTravelOption={currentTravelOption}
              handleSelectTravelOption={handleSelectTravelOption}
            />
          )}
        </div>
        <>
          {!showDestinationStationSuggestions &
          !showFromStationSuggestions &
          !isLoading &
          (destinationState === "planning") &
          ((fromStationQuery.length > 0) &
            (destinationStationQuery.length > 0)) ? (
            <div className="button-container">
              <Button size={"big"} onClick={() => getTravelOptions()}>
                Plan
              </Button>
            </div>
          ) : (
            ""
          )}
          {currentTravelOption !== null && (
            <div className="button-container">
              <Button size={"big"} onClick={() => setBooking()}>
                Book
              </Button>
            </div>
          )}
        </> */
