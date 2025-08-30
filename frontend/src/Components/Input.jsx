import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  handleChange,
  hidden,
  id,
  reference,
  valueInput,
}) => {
  return (
    <input
      id={id}
      hidden={hidden}
      value={valueInput}
      type={type}
      name={name}
      ref={reference}
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Input;
