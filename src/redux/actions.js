// action 对象

import {
    reqRegister,
    reqLogin,
    reqImprove,
    reqCurUser,
    reqUserList,
} from '../api/require';

import {
    AUTH_USER,
    BACK_MSG,
    USER_LIST
} from './action-types';

import {
    packRedire,
} from '../utils/packRedire';


// 授权的同步 action
export const auth_action = (user) => ({ type: AUTH_USER, data: user });

// 反馈信息的 action
export const back_MSG = (msg) => ({ type: BACK_MSG, data: msg });

// 获取用户列表的同步 action
export const user_list = (userlist) => ({type:USER_LIST, data: userlist });





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
        const result = await reqRegister(user);
        if (result.data.code === 0) {
            dispatch(auth_action(packRedire(result.data.data, '/information')));
            dispatch(back_MSG('注册成功'))
        } else {
            dispatch(back_MSG(result.data.msg));
        }

    }
}


// 登陆的异步action
export const loginAction = (user) => {
    const { username, password } = user;
    if (!username) {
        return back_MSG('用户名不能为空！');
    } else if (!password) {
        return back_MSG('密码不能为空！');
    }
    return async dispatch => {
        const result = await reqLogin(user);
        if (result.data.code === 0) {
            dispatch(auth_action(packRedire(result.data.data,'/userlist')));
            dispatch(back_MSG('登陆成功'));
        } else {
            dispatch(back_MSG(result.data.msg))
        }
    }
}

// 完善信息的异步 action
export const MessageAction = (user) => {
    const { header } = user;
    if (!header) {
        return back_MSG('请选择您的头像');
    }
    return async dispatch => {
        const result = await reqImprove(user);
        if (result.data.code === 0) {
            dispatch(auth_action(packRedire(result.data.data,'/userlist')));
            dispatch(back_MSG('提交成功'));
        } else {
            dispatch(back_MSG(result.data.msg));
        }
    }
}

// 获取当前user 的异步action
export const CurrentUser = () => {
    return async dispatch => {
        const result = await reqCurUser();
        if (result.data.code === 0) {
            dispatch(auth_action(packRedire(result.data.data,'/userlist')));
        } else {
            dispatch(back_MSG(result.data.msg));
        }
    }
}


// 获取用户列表
export const getUserList = (type) => {
    return async dispatch => {
        const result = await reqUserList(type);
        if(result.data.code === 0){
            dispatch(user_list(result.data.data));
        }else{
            dispatch(back_MSG(result.data.msg));
        }
    }
}