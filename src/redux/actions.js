// action 对象

import {
    reqRegister,
    reqLogin,
    reqImprove,
    reqCurUser,
    reqUserList,
    reqMsgList,
} from '../api/require';

import {
    AUTH_USER,
    BACK_MSG,
    USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
} from './action-types';

import {
    packRedire,
} from '../utils/packRedire';

// socket.io
import io from 'socket.io-client';


// 授权的同步 action
export const auth_action = (user) => ({ type: AUTH_USER, data: user });

// 反馈信息的 action
export const back_MSG = (msg) => ({ type: BACK_MSG, data: msg });

// 获取用户列表的同步 action
export const user_list = (userlist) => ({ type: USER_LIST, data: userlist });

// 接收消息的同步 action
export const receive_Msg = (chatMsg, userId) => ({ type: RECEIVE_MSG, data: { chatMsg, userId } });

// 接收消息列表的同步 action
export const receive_Msg_List = ({ users, chatMsgs, userId }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userId } });





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
            // 获取聊天信息列表
            getMsgList(dispatch, user._id);
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
            dispatch(auth_action(packRedire(result.data.data, '/userlist')));
            dispatch(back_MSG('登陆成功'));
            // 获取聊天信息列表
            getMsgList(dispatch, user._id);
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
            dispatch(auth_action(packRedire(result.data.data, '/userlist')));
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
            dispatch(auth_action(packRedire(result.data.data, '/userlist')));
            // 获取聊天信息列表
            getMsgList(dispatch, result.data.data._id);
        } else {
            dispatch(back_MSG(result.data.msg));
        }
    }
}


// 获取用户列表
export const getUserList = (type) => {
    return async dispatch => {
        const result = await reqUserList(type);
        if (result.data.code === 0) {
            dispatch(user_list(result.data.data));
        } else {
            dispatch(back_MSG(result.data.msg));
        }
    }
}

// 单例模式
// 初始化socket.io 对象
function initIO(dispatch, userId) {
    // 在创建socket.io对象是时，判断该对象是否存在
    if (!io.socket) {
        // 连接服务器，得到服务器的连接对象
        io.socket = io('ws://localhost:4000');
        // 绑定监听，接收服务器发来的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            // 只有当前的chatMsg 是与当前用户相关的消息,采取分发同步的action
            if (userId === chatMsg.from || userId === chatMsg.to) {
                console.log('发送了信息');
                dispatch(receive_Msg(chatMsg, userId));
            }
        });
    }
}


// 获取消息列表的异步 action
async function getMsgList(dispatch, userId) {
    initIO(dispatch, userId);
    const result = await reqMsgList();
    if (result.data.code === 0) {
        const { users, chatMsgs } = result.data.data;
        // 分发同步的action
        dispatch(receive_Msg_List({ users, chatMsgs, userId }));
    }
}

// 发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
    return (dispatch) => {
        initIO(dispatch)
        console.log('向客户端发送消息', { from, to, content });
        // 发消息
        io.socket.emit('sendMsg', { from, to, content });
    }
}
