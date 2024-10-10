import { CloseIcon } from "../icons/Icons";

export default function InputField({
  placeHolder,
  type,
  value,
  onChange,
  key,
  showClearButton,
  onClearButton,
}) {
  return (
    <div className="input-container">
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
