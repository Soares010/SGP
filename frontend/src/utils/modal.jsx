import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../assets/styles/Modal.css";

export function Modal() {
  const confirm = {
    message: "Tem certeza que deseja apagar?",
    buttons: [
      {
        label: "Sim",
        onClick: () => alert("Click Yes"),
      },
      {
        label: "Não",
        onClick: () => alert("Click No"),
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {
      document
        .querySelector(".react-confirm-alert-body")
        ?.classList.add("closing");
    },
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "custom-overlay",
  };

  return confirmAlert(confirm);
}
