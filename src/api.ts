import axios from "axios";

const auth = JSON.parse(localStorage.getItem("auth"));

export default axios.create({
  baseURL: "http://localhost:3333/api",
  headers: {
    Authorization: `Bearer ${auth?.token || ""}`,
  },
});
