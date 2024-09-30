export function Card({ title, children, alignTop = true }) {
  return (
    <div
      className={
        "card " +
        (alignTop ? " flex-align-self-baseline " : "flex-align-self-center")
      }
    >
      {title !== "" && <div className="card-title">{title}</div>}
      <div className="card-view">{children}</div>
    </div>
  );
}

export function MainCard({ children }) {
  return (
    <div className="card main ">
      <div className="card-view">{children}</div>
    </div>
  );
}
