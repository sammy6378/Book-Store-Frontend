import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Instance;