import { Button } from "./Button";

export default function Modal({ onNoClicked, onYesClicked }) {
  return (
    <>
      <div className="modal-background" onClick={onNoClicked}></div>
      <div className="modal">
        <div className="modal-top"> </div>
        <div className="modal-content margin-bottom-s">Weet je het zeker?</div>
        <div className="modal-cta">
          <Button
            size={"small"}
            additionalClass={"primary"}
            onClick={onYesClicked}
          >
            Ja
          </Button>
          <Button size={"small"} onClick={onNoClicked}>
            Nee
          </Button>
        </div>
      </div>
    </>
  );
}
