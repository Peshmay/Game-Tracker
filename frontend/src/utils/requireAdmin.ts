import { NavigateFunction } from "react-router-dom";

export function requireAdmin(navigate: NavigateFunction) {
  const isAdmin =
    (localStorage.getItem("isAdmin") || sessionStorage.getItem("isAdmin")) ===
    "true";

  if (!isAdmin) {
    navigate("/admin-login", { replace: true });
    return false;
  }

  return true;
}
