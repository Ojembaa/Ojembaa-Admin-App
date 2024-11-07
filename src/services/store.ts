import { jwtDecode } from "jwt-decode";

export function getAuthFromLocal() {
  return typeof window !== "undefined"
    ? window.sessionStorage.getItem("token")
    : null;
}

export function getCurrentUser() {
  // return {
  //   user: "testing",
  //   lastName: "developer",
  // };
  return typeof window !== "undefined"
    ? JSON.parse(window.sessionStorage.getItem("user")!)
    : null;
}

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded JWT:", decoded);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

