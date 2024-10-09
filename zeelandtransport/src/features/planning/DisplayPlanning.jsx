import { useDispatch, useSelector } from "react-redux";
import { MainCard } from "../../components/Card";
import { TaxiIcon } from "../../icons/Icons";
import { setAppState } from "../../AppSlice";
import { setPlanningState } from "./PlanSlice";
import { setSelectedTravelOption } from "../booking/BookingSlice";
import { useNavigate } from "react-router-dom";

export default function DisplayPlanning({ children }) {
  const fromStation = useSelector((state) => state.plan.fromStation);
  const toStation = useSelector((state) => state.plan.toStation);
  const travelTime = useSelector((state) => state.plan.time);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleResetSearch() {
    dispatch(setPlanningState("planFilter"));
    dispatch(setSelectedTravelOption(null));
    dispatch(setAppState("appPlanning"));
    navigate("/");
  }
  return (
    <MainCard handleOnClick={handleResetSearch}>
      {children}
      <div className="display-flex justify-content-space-between text-align-center">
        <div>{fromStation?.name}</div>
        <div className="label">naar</div>
        <div>{toStation?.name}</div>
      </div>
      <div className="display-flex gap-base flex-align-items-center margin-top-m">
        <div className="display-flex gap-base flex-align-items-center">
          <div className="label">Met</div>
          <div className="flex1">
            <TaxiIcon />
          </div>
        </div>
        <div className="display-flex gap-base flex-align-items-center">
          <div className="label">om</div>
          <div className="flex1">{travelTime}</div>
        </div>
      </div>
    </MainCard>
  );
}
