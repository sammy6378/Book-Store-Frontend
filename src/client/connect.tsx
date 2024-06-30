import axios from "axios";

const Instance = axios.create({
  baseURL: "https://book-store-backend-08ow.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Instance;