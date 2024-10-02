export function Button({
  children,
  selected,
  size,
  onClick,
  disabled = false,
}) {
  return (
    <button
      className={"button " + size + " " + (selected ? "selected " : "")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
