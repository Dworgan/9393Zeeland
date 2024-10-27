import { Link } from "react-router-dom";
import { MenuIcon, UserIcon } from "../icons/Icons";

function Navigation({ children }) {
  return (
    <div className="nav color-primary">
      <div>
        <MenuIcon width={"40px"} height={"40px"} color="color-primary" />
      </div>
      <Link to={"/"}>
        <div className="flex1 h1 text-align-center font-bold"> FLEXITAXI</div>
      </Link>
      <div>
        <Link to={"/EditUser"}>
          <UserIcon width={"40px"} height={"40px"} color="color-primary" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
