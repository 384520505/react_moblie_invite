// 请求接口
import {Axios} from './axios';


// 注册接口
export const reqRegister = (user) => Axios('/register',user, 'POST');

// 登陆接口
export const reqLogin = (user) => Axios('/login',user, 'POST');

// 完善用户信息接口
export const reqImprove = (message) => Axios('/update',message,'POST');

// 获取当前的 user
export const reqCurUser = () => Axios('/user');

// 获取用户列表
export const reqUserList = (type) => Axios('/userlist', {type}, 'GET');

// 获取消息列表
export const reqMsgList = () => Axios('/msglist');

// 读取消息
export const reqReadedMsg = (from) => Axios('/readmsg',{from}, 'POST');