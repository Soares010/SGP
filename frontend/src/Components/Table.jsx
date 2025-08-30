import React from "react";
import { Link } from "react-router-dom";

const Table = ({ headers, data, icon }) => {
  const formatedNumber = new Intl.NumberFormat("pt-ao", {
    style: "currency",
    currency: "AOA",
  });
  return (
    <table>
      <thead>
        <tr>
          {headers.map(({ key, name }) => (
            <th key={`${key}-${name}`}>*{name}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {headers.map(({ key }) => (
              <td key={`${item._id}-${key}`}>
                {key === "days" && `${item[key]} dias`}
                {key === "cost" || key === "budget"
                  ? formatedNumber.format(item[key])
                  : key !== "days" && item[key]}
              </td>
            ))}
            <td>
              {icon.map(({ id, icon, to }) => (
                <Link to={to} state={{ id: item._id }} key={id}>
                  {icon}
                </Link>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
