export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const authToken = window.localStorage.getItem("token");
    return !!authToken;
  }
  return false;
};
