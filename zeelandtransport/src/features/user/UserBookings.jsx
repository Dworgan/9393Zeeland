import { useEffect, useState } from "react";
import { MainCard } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TaxiIcon } from "../../icons/Icons";
import { setConfirmedTravelOption } from "../booking/BookingSlice";
import {
  FormatHoursAndMinutes,
  GetHoursAndMinutes,
} from "../../utils/TimeFormat";

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
      <div className="h1 color-primary text-align-center">Mijn Boekingen</div>
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
              <div className="flex1 details l">
                <div>
                  <div className="label">Boekings Nmr</div>
                  <div>{travelOption.legs[0].ticket.tokenData.url}</div>
                </div>
                <div>
                  <div className="label">Van</div>
                  <div>{travelOption.from.name}</div>
                </div>
                <div>
                  <div className="label">Naar</div>
                  <div>{travelOption.to.name}</div>
                </div>
                <div>
                  <div className="label">Vertrektijd</div>
                  <div>{GetHoursAndMinutes(travelOption?.departureTime)}</div>
                </div>
              </div>
            </div>
          ))}
      </MainCard>
    </>
  );
}
