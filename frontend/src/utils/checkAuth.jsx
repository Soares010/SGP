import React from "react";
import { Navigate } from "react-router-dom";

export function check() {
  const data = localStorage.getItem("dataWithTokenAuth");

  let jsonDataDescompact;

  if (!data) {
    return {
      redirect: <Navigate to="/" replace />,
      user: null,
    };
  } else {
    try {
      jsonDataDescompact = JSON.parse(data);
      if (!jsonDataDescompact.token || !jsonDataDescompact.dataNoPassword) {
        return {
          redirect: <Navigate to="/" replace />,
          user: null,
        };
      }
      return {
        redirect: null,
        user: jsonDataDescompact,
      };
    } catch (error) {
      console.log("Ocorreu algum erro ", error);
      return {
        redirect: <Navigate to="/" replace />,
        user: null,
      };
    }
  }
}
