import Loader from "./feedback/Loader";

export function Button({
  children,
  selected,
  size,
  onClick,
  disabled = false,
  additionalClass,
  isLoading,
}) {
  return (
    <button
      className={
        "button " +
        size +
        " " +
        (selected ? "selected " : "") +
        " " +
        additionalClass
      }
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}
