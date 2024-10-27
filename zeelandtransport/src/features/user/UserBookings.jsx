import { useEffect, useState } from "react";
import { MainCard } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TaxiIcon } from "../../icons/Icons";
import { setConfirmedTravelOption } from "../booking/BookingSlice";
import { GetHoursAndMinutes } from "../../utils/TimeFormat";

export default function UserBookings() {
  const [savedBookings, setSavedBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initListOfBookings = useSelector((state) => state.user.listOfBookings);
  useEffect(() => {
    setSavedBookings(initListOfBookings);
  }, [initListOfBookings]);

  function onBookingSelection(iTravelOption) {
    console.log(iTravelOption);
    dispatch(setConfirmedTravelOption(iTravelOption));
    navigate("/BookingConfirmation");
  }

  return (
    <>
      <div className="h1 color-primary text-align-center">Reis Overzicht</div>
      <MainCard>
        {savedBookings.length === 0 && "Je hebt nog geen reis geboekt."}
        {savedBookings.length > 0 &&
          savedBookings.map((travelOption) => (
            <div
              className={"default-detail "}
              onClick={() => onBookingSelection(travelOption)}
            >
              <div>
                <TaxiIcon />
              </div>
              <div className="flex1 ">
                <div className="display-flex">
                  <div className="h4 color-primary letter-spacing-m">
                    <div>{travelOption.legs[0].ticket.tokenData.url}</div>
                  </div>
                </div>
                <div className="display-flex">
                  <div className="flex1">
                    <div className="label">Van</div>
                    <div>{travelOption.from.name}</div>
                  </div>
                  <div className="flex1">
                    <div className="label">Naar</div>
                    <div>{travelOption.to.name}</div>
                  </div>
                  <div className="">
                    <div className="label ">Vertrektijd</div>
                    <div>{GetHoursAndMinutes(travelOption?.departureTime)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </MainCard>
    </>
  );
}
