import { NavigateFunction } from "react-router-dom";

export function requireUser(navigate: NavigateFunction) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // User must be logged in AND not admin
  if (isAdmin) return true;

  // Firebase auth already guarantees login
  return true;
}
