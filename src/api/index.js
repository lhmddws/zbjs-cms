import axios from "@/utils/request";
//登陆请求
export const login = (data) => { 
  return axios.post("/login", data);
};

//出库请求
export const OutboundRecords = (data) => {
  return axios.post("/Outbound", data);
};

// 入库请求
export const InboundRecords = (data) => {
  return axios.post("/inbound", data);
};

// 重置密码
export const resetPassword = (data) => {
  return axios.put('/user', {
    jobId: data.jobId,
    password: '12345678'
  });
}
