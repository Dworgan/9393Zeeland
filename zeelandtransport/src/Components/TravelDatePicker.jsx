import { useEffect, useState } from "react";
import { GetDayAndMonth, GetDayName } from "../utils/TimeFormat";

export default function DatePicker(onDatePicked) {
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  useEffect(function () {
    const tDaysTotal = 4;
    var tDates = [];

    for (let index = 0; index < tDaysTotal; index++) {
      var tDateData = {
        _id: -1,
        newDate: "",
        originalDate: "",
      };
      var tDay = new Date();
      tDay.setDate(tDay.getDate() + index);
      tDateData._id = index;
      tDateData.newDate = tDay;
      tDateData.originalDate = tDay;

      tDates.push(tDateData);
    }
    setDateOptions(() => tDates);

    setSelectedDate(() => dateOptions[0]);
  }, []);

  function onSetSelectedDate(iDate) {
    setSelectedDate(iDate);
  }
  return (
    <>
      <div className="datepicker-container">
        {dateOptions.length > 0 &&
          dateOptions.map((date) => (
            <DateDisplay
              setDate={date}
              currentSelectedDate={selectedDate}
              onClick={() => onSetSelectedDate(date)}
            />
          ))}
      </div>
    </>
  );
}

const DateDisplay = ({ setDate, currentSelectedDate, onClick }) => {
  return (
    <div
      className={
        "datepicker-item" +
        (setDate?.newDate === currentSelectedDate?.newDate ? " selected " : "")
      }
      onClick={onClick}
    >
      <div className="text-align-center">{GetDayName(setDate.newDate)}</div>
      <div className="text-align-center">
        {" "}
        {GetDayAndMonth(setDate.newDate)}
      </div>
    </div>
  );
};
