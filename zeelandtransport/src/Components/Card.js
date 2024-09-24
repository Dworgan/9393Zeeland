export function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-view">{children}</div>
    </div>
  );
}

export function MainCard({ children }) {
  return (
    <div className="card main">
      <div className="card-view">{children}</div>
    </div>
  );
}
