export function requireUser() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const rawUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  return !!token && !!rawUser;
}
