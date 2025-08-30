import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
const notify = ({ type, message, configMessage }) => {
  if (!message) return;

  const options = {
    duration: 2000,
    position: "bottom-right",
    removeDelay: 1000,
  };

  const icons = {
    success: <FontAwesomeIcon icon={faCheck} style={{ color: "#00FF00" }} />,
    error: <FontAwesomeIcon icon={faXmark} style={{ color: "#FF0000" }} />,
  };

  if (toast[type]) {
    toast[type](message, {
      ...options,
      icon: icons[type],
    });
    const timeout = setTimeout(() => configMessage(""), 2000);
    return () => clearTimeout(timeout);
  }
};

export default notify;
