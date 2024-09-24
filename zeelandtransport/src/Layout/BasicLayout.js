import Navigation from "./Navigation";

function BasicLayout({ children }) {
  return (
    <div className="layout">
      <Navigation />
      {children}
    </div>
  );
}

export default BasicLayout;
