import { MenuIcon, UserIcon } from "../icons/Icons";

function Navigation({ children }) {
  return (
    <div className="nav color-primary">
      <div>
        <MenuIcon width={"40px"} height={"40px"} color="color-primary" />
      </div>
      <div className="flex1 h1 text-align-center font-bold"> FLEXITAXI</div>
      <div>
        <UserIcon width={"40px"} height={"40px"} color="color-primary" />
      </div>
    </div>
  );
}

export default Navigation;
