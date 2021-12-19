import axios from "axios";

const auth = JSON.parse(localStorage.getItem("auth"));

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.API_URL_DEV
      : process.env.API_URL_PROD,
  headers: {
    Authorization: `Bearer ${auth?.token || ""}`,
  },
});
