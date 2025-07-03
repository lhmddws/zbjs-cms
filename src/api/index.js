
//出库请求
export const OutboundRecords = (data) => {
  return axios.post("/Outbound", data);
};

// 入库请求
export const InboundRecords = (data) => {
  return axios.post("/inbound", data);
};

