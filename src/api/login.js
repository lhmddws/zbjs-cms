import axios from "@/utils/request";
//登陆请求
export const login = (data) => { 
  return axios.post("/login", data);  
  // 这里的data应该包含用户名和密码
  // { id account name isAdmin token}
};
