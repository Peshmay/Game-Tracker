export function requireUser() {
  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("user");
  return !!token && !!rawUser;
}
