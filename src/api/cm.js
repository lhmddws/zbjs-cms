import axios from 'axios';

//获取总表
export const getCmList = (data) => {
  return axios.post('/mainConsume', data);
}