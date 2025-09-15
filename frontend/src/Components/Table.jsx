import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Table = ({ headers, data, icon, handleClick }) => {
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
                {key === "days"
                  ? `${item[key]} ${item[key] > 1 ? "dias" : "dia"}`
                  : key === "cost" || key === "budget"
                  ? formatedNumber.format(item[key])
                  : item[key]}
              </td>
            ))}
            <td>
              {icon.map(({ id, icon, type, to }) =>
                type === "link" ? (
                  <Link
                    to={`${to}/${item._id}`}
                    state={{ id: item._id }}
                    key={id}
                  >
                    {icon}
                  </Link>
                ) : (
                  <Button handleClick={() => handleClick(item._id)} key={id}>
                    {icon}
                  </Button>
                )
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
