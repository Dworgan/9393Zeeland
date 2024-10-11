import { useDispatch, useSelector } from "react-redux";
import { Button } from "./Button";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { setPlanningTime } from "../features/planning/PlanSlice";

export function TravelTime() {
  const dispatch = useDispatch();
  const traverlTime = useSelector((state) => state.plan.time);
  function onTimeChange(time) {
    dispatch(setPlanningTime(time));
  }
  function onSetTimeNow() {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    dispatch(setPlanningTime(time));
  }
  return (
    <div className="display-flex  flex-align-items-center datepicker-time">
      <div className="flex1">
        <Button size={"small"} selected={true}>
          Vertrek
        </Button>
      </div>
      <div className="display-flex gap-base">
        <div>
          <Button onClick={() => onSetTimeNow()} selected={false}>
            z.s.m.
          </Button>
        </div>
        <input
          aria-label="Time"
          type="time"
          value={traverlTime}
          onChange={(e) => onTimeChange(e.target.value)}
        />
      </div>
    </div>
  );
}
