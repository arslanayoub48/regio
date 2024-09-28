import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/helpers";

export const getLoggedinUser = () => {
  const user = getCookie("regio-auth");
  if (!user) {
    return null;
  } else {
    return user;
  }
};

const token = getCookie("regio-auth");

if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

const apiService = axios.create({
  baseURL: "https://development-api-next.regio.is/",
});

// Add a response interceptor to handle 401 errors
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (
        !error.config.url.includes("login") &&
        !error.config.url.includes("logout")
      ) {
        window.location.href = "/login";
      }
      removeCookie("regio-auth");
    }
    return Promise.reject(error);
  }
);

// Set initial token from cookie
apiService.defaults.headers.common["Authorization"] =
  "Bearer " + getCookie("regio-auth");
apiService.defaults.baseURL = "https://development-api-next.regio.is/";
apiService.defaults.timeout = 10000;

// Function to update the bearer token
export const updateBearerToken = (newToken) => {
  apiService.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  setCookie("regio-auth", newToken, 24);
};

export default apiService;
