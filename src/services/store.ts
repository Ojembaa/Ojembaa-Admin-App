export function getAuthFromLocal() {
  return typeof window !== "undefined"
    ? window.sessionStorage.getItem("token")
    : null;
}

export function getCurrentUser() {
  return typeof window !== "undefined"
    ? JSON.parse(window.sessionStorage.getItem("user")!)
    : null;
}
