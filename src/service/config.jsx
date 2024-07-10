import axios from "axios";
import { setIsLoading } from "../redux/spinnerSlice";
import { store } from "..";

export let https = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDMiLCJIZXRIYW5TdHJpbmciOiIxNS8wMS8yMDI1IiwiSGV0SGFuVGltZSI6IjE3MzY4OTkyMDAwMDAiLCJuYmYiOjE3MTk0MjEyMDAsImV4cCI6MTczNzA0NjgwMH0._1nNTer6EQJycfH9UBD3WvpKecB92OKCg9GEyX6eSSc",
  },
});

// axios interceptor
// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // open loading
    store.dispatch(setIsLoading(true));
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // close loading
    store.dispatch(setIsLoading(false));
    return response;
  },
  function (error) {    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // close loading
    store.dispatch(setIsLoading(false));
    return Promise.reject(error);
  }
);
