import axios from "axios";
//设置axios默认请求头url

const service = axios.create({
  baseURL: "http://192.168.113.83:3000/mock/19",
});
//设置请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);
//设响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response error
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);
export default service;
