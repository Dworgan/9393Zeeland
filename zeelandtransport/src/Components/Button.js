export function Button({ children, size, onClick }) {
  return (
    <button className={'button ' + size} onClick={onClick}>
      {children}
    </button>
  );
}
