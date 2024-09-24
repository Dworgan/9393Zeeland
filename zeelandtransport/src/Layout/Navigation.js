import { MenuIcon, UserIcon } from "../icons/icons";

function Navigation({ children }) {
  return (
    <div className="nav color-primary">
      <div>
        <MenuIcon width={"40px"} height={"40px"} color="color-primary" />
      </div>
      <div className="flex1"></div>
      <div>
        <UserIcon width={"40px"} height={"40px"} color="color-primary" />
      </div>
    </div>
  );
}

export default Navigation;
