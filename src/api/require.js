// 请求接口
import {Axios} from './axios';


// 注册接口
export const reqRegister = (user) => Axios('/register',user, 'POST');

// 登陆接口
export const reqLogin = (user) => Axios('/login',user, 'POST');