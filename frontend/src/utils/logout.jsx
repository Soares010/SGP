import React from "react";

export function logout() {
  localStorage.clear();
  location.href = "/";
}
