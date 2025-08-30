import React from "react";

const Select = ({ name, options = [], text, handleChange }) => {
  return (
    <select name={name} onChange={(e) => handleChange(e)}>
      <option value="">{text}</option>
      {options.map(({ id, value }) => (
        <option key={id} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
