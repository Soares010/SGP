import React from "react";

const Text = ({ name, handleChange, className, placeholder }) => {
  return (
    <textarea
      name={name}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
    ></textarea>
  );
};

export default Text;
