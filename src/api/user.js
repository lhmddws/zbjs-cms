import axios from "@/utils/request";

//获取用户列表
export const getUserlist = (data) => {
  return axios.get("/userInquire", { params: data });
};

//用户新增
export const addUser = (data) => {
  return axios.post("/adduser", data);
};

//用户删除
export const deleteUser = (data) => {
  return axios.delete("/deleteuser", { params: data });
};

//用户修改
export const updateUser = (data) => {
  return axios.put("/user", data);
};

// 修改密码
export const changePassword = (data) => {
  return axios.post("/updataPassword", data);
};
