import { CloseIcon } from "../icons/Icons";

export default function InputField({
  placeHolder,
  type,
  value,
  onChange,
  key,
  showClearButton,
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
      <div className="clear-button">
        <CloseIcon />
      </div>
    </div>
  );
}
