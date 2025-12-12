// frontend/src/utils/adminGuard.ts
export function requireAdmin(navigate: any) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    navigate("/admin-login");
    return false;
  }
  return true;
}
