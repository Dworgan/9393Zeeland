import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import DisplayPlanning from "../planning/DisplayPlanning";
import { useDispatch, useSelector } from "react-redux";
import { GetHoursAndMinutes } from "../../utils/TimeFormat";
import {
  setConfirmedTravelOption,
  setSelectedTravelOption,
} from "./BookingSlice";
import { setAppState } from "../../AppSlice";
import { TravelContinuationOptionCard } from "../travel/TravelContinuationOption";
import { TravelIcon } from "../../icons/Icons";

export const testBooking = [
  {
    validUntil: new Date().getDate(),
    options: [
      {
        id: "794c9d63-5992-41a2-8885-08dcd7d31bbc",
        from: {
          latitude: 51.493202,
          longitude: 3.616107,
          stopReferences: [],
        },
        to: {
          latitude: 51.49044,
          longitude: 3.630872,
          stopReferences: [],
        },
        departureTime: "2024-09-18T15:30:00+02:00",
        arrivalTime: "2024-09-18T15:34:48+02:00",
        customer: null,
      },
    ],
  },
];

export default function BookingOptions() {
  const selectedTravelOption = useSelector(
    (state) => state.booking.selectedTravelOption
  );
  return (
    <>
      <DisplayPlanning />
      <TravelOptionCard />

      {selectedTravelOption !== null && (
        <>
          <TravelContinuationOptionCard />
          <BookATravel />
        </>
      )}
    </>
  );
}

const TravelOptionCard = ({ departureTime, arrivalTime, price }) => {
  const travelOptions = useSelector(
    (state) => state.booking.listOfTravelOptions
  );
  const selectedTravelOption = useSelector(
    (state) => state.booking.selectedTravelOption
  );
  const dispatch = useDispatch();
  function handleSelectTravelOption(iStation) {
    dispatch(setSelectedTravelOption(iStation));
    console.log(selectedTravelOption);
  }
  return (
    <Card title={"Reis Opties"}>
      {travelOptions.options.length === 0 && (
        <div className="flex-center"> Er zijn geen reisopties beschikbaar.</div>
      )}
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
                <div className="label">Vertrek </div>
                <div>{GetHoursAndMinutes(travelOption.departureTime)}</div>
              </div>
              <div>
                <div className="label">Aankomst</div>
                <div>{GetHoursAndMinutes(travelOption.arrivalTime)}</div>
              </div>
              <div>
                <div className="label">Prijs</div>
                <div>3,50</div>
              </div>
            </div>
          </div>
        ))}
    </Card>
  );
};

const BookATravel = () => {
  const dispatch = useDispatch();
  async function GetTravelOptions() {
    const tConfirmedTravelOption = await setBooking();
    dispatch(setConfirmedTravelOption(tConfirmedTravelOption));
    dispatch(setAppState("appTravelConfirmation"));
  }
  return (
    <div className="button-container">
      <Button size={"big"} onClick={() => GetTravelOptions()}>
        Boek
      </Button>
    </div>
  );
  async function setBooking() {
    var b = {
      id: "df5a2387-2a97-4286-d419-08dcdee6d1c3",
      from: {
        latitude: 51.330444,
        longitude: 3.498376,
        stopReferences: [],
      },
      to: {
        latitude: 51.396683,
        longitude: 3.551355,
        stopReferences: [],
      },
      departureTime: "2024-09-27T15:00:00+02:00",
      arrivalTime: "2024-09-27T15:19:08+02:00",
      customer: null,
    };
    try {
      //setIsLoading(true);
      const url = "http://localhost:8080/bookings";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(b),
      });

      if (!res.ok) throw new Error("Booking is niet gelukt");
      const data = await res.json();
      if (data.Response === "False") throw new Error("Booking is niet gelukt");
      console.log(data);
      return confirmBooking(data.id);
    } catch (err) {
      //setError(err.message);
    } finally {
      // setIsLoading(false);
    }
  }
  async function confirmBooking(id) {
    try {
      const url = `http://localhost:8080/bookings/${id}/events`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "COMMIT",
          origin: "TO",
        }),
      });
      if (!res.ok) throw new Error("Booking is niet bevestigt");
      const data = await res.json();
      if (data.Response === "False")
        throw new Error("Booking is niet bevestigt");
      return data;
    } catch (err) {
      //setError(err.message);
    } finally {
      //setIsLoading(false);
    }
    //setAppState("bookingconfirmed");
  }
};
