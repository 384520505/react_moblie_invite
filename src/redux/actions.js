// action 对象

import { 
    reqRegister,
    reqLogin,
 } from '../api/require';

import {
    AUTH_USER,
    BACK_MSG,
} from './action-types';


// 授权的同步 action
export const auth_action = (user) => ({ type: AUTH_USER, data: user });

// 登陆

// 反馈信息的 action
export const back_MSG = (msg) => ({ type: BACK_MSG, data: msg });




// 注册的异步 action
export const registerAction = (user) => {
    const { username, password, rePassword } = user;
    if (!username) {
        return back_MSG('用户名不能为空！');
    } else if (!password) {
        return back_MSG('密码不能为空！');
    } else if (password !== rePassword) {
        return back_MSG('输入的两次密码不一样');
    }
    return async dispatch => {
        console.log('registerAction', user)
        const result = await reqRegister(user);
        console.log(result)
        if (result.data.code === 0) {
            dispatch(auth_action(result.data.data));
            dispatch(back_MSG('注册成功'))
        } else {
            dispatch(back_MSG(result.data.msg));
        }

    }
}


// 登陆的异步action
export const loginAction = (user) => {
    const { username, password } = user;
    if(!username){
        return back_MSG('用户名不能为空！');
    } else if(!password){
        return back_MSG('密码不能为空！');
    }
    return async dispatch => {
        const result = await reqLogin(user);
        if(result.data.code === 0){
            dispatch(auth_action(result.data.data));
            dispatch(back_MSG('登陆成功'));
        }else {
            dispatch(back_MSG(result.data.msg))
        }
    }
}