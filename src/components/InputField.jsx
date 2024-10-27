import { CloseIcon } from "../icons/Icons";

export default function InputField({
  placeHolder,
  type,
  value,
  onChange,
  key,
  showClearButton,
  onClearButton,
  label = "",
  cssExtra = "",
}) {
  return (
    <div className={"input-container " + cssExtra}>
      {label !== "" && <div className="label">{label}</div>}
      <input
        placeholder={placeHolder}
        type={type}
        value={value}
        onChange={onChange}
        key={key}
      ></input>
      {showClearButton && (
        <div className="clear-button" onClick={onClearButton}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
}
