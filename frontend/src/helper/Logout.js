const Logout = (navigate) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  navigate("/login");
};

export default Logout;
