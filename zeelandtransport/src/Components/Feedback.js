export function ErrorMessage({ message }) {
  return (
    <p className='error'>
      <span>⛔</span> {message}
    </p>
  );
}

export function InfoMessage({ message }) {
  return (
    <div className='display-flex flex-align-items-center flex-justify-content-center container-fullheight'>
      {message}
    </div>
  );
}
