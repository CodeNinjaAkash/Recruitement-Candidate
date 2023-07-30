import axios from "axios";
import { getQuizTime, getToken } from "../Services/Localstorage";
const http = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use(
  (req) => {
    const token = getToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
      req.headers.quizTimer = getQuizTime();
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default http;
