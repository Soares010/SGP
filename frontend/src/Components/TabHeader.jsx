import React from "react";

const TabHeader = ({ tabs, active, changeTab }) => {
  return (
      <div className="head-tab">
          
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          className={` ${active === id ? "active" : ""}`}
          onClick={() => changeTab(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TabHeader;
