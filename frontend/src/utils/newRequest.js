import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8800/api/", // add to .env
  withCredentials: true,
});

export default newRequest;
