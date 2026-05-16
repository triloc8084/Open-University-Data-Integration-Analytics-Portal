export const BASE_URL = "http://localhost:5000";

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  return res;
};

export default apiFetch;
