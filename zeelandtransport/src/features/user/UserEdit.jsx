import { useEffect, useState } from "react";
import { MainCard } from "../../components/Card";
import InputField from "../../components/InputField";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateUserInfo } from "./UserSlice";

export default function UserEdit() {
  const [voornaam, setVoornaam] = useState();
  const [achternaam, setAchternaam] = useState();
  const [email, setEmail] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initFirstName = useSelector((state) => state.user.userInfo.firstName);
  const initLastName = useSelector((state) => state.user.userInfo.lastName);
  const initEmail = useSelector((state) => state.user.userInfo.email);
  const initPhoneNumber = useSelector(
    (state) => state.user.userInfo.phoneNumber
  );

  useEffect(function () {
    setVoornaam(initFirstName);
    setAchternaam(initLastName);
    setEmail(initEmail);
    setPhoneNumber(initPhoneNumber);
  }, []);

  function onSaveUserData() {
    dispatch(setUpdateUserInfo(voornaam, achternaam, email, phonenumber));
    navigate("/");
  }

  return (
    <MainCard>
      <form className="form-destination">
        <div className="flex1 display-flex flex-direction-column">
          <InputField
            label="Voornaam"
            placeHolder={""}
            type={"text"}
            value={voornaam}
            defaultValue={initFirstName}
            onChange={(e) => setVoornaam(e.target.value)}
            cssExtra="secondary margin-bottom-s"
          />
          <InputField
            label="Achternaam"
            placeHolder={""}
            type={"text"}
            value={achternaam}
            defaultValue={initLastName}
            onChange={(e) => setAchternaam(e.target.value)}
            cssExtra="secondary margin-bottom-s"
          />
          <InputField
            label="Email"
            placeHolder={""}
            type={"email"}
            value={email}
            defaultValue={initEmail}
            onChange={(e) => setEmail(e.target.value)}
            cssExtra="secondary margin-bottom-s"
          />
          <InputField
            label="Telefoon Nummer"
            placeHolder={""}
            type={"number"}
            value={phonenumber}
            defaultValue={initPhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            cssExtra="secondary margin-bottom-s"
          />
        </div>
      </form>
      <div className="text-align-center margin-top-base">
        <Button size={"small"} onClick={() => onSaveUserData()}>
          Opslaan
        </Button>
      </div>
    </MainCard>
  );
}
