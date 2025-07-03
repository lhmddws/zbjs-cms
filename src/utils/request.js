import axios from "axios";

const service = axios.create({
  baseURL: "http://192.168.1.197:8080", // 设置基础URL
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 读取 token，key 根据实际情况调整
    if (token) {
      config.headers["token"] = `${token}`; // 按需设置请求头字段
    }
    console.log("请求配置:", config);
    return config;
  },
  (error) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log("响应结果:", response);
    return response;
  },
  (error) => {
    console.error("响应错误:", error);
    return Promise.reject(error);
  }
);

export default service;
