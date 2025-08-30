import React from "react";

const Button = ({ children, className, handleClick, keyId }) => {
  return (
    <button className={className} onClick={handleClick} >
      {children}
    </button>
  );
};

export default Button;
