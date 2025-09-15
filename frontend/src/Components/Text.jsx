import React from "react";

const Text = ({ name, handleChange, className, placeholder, value }) => {
  return (
    <textarea
      name={name}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
      value={value ?? ""}
    ></textarea>
  );
};

export default Text;
