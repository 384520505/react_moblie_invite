// reducer 函数： 通过 旧的 state 和 action 返回新的 state

import {combineReducers} from 'redux'

import {
    AUTH_USER,
    BACK_MSG,
    USER_LIST,
    USER_LIST_MSG,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
} from './action-types';



const initUser = {
    username:'',
    password:'',
    type:'',   //type:用户类型
    msg:'',    //msg:注册的反馈信息
    redireTo:'', //页面重定向的路径
}
// 用户信息
function user (state=initUser, action) {
    switch(action.type){
        case AUTH_USER:
            return {...state, ...action.data};
        case BACK_MSG:
            return {...state, msg:action.data};
        default:
            return state;
    }
}

const initUserList = {
    userlist:[],
    msg:'',
}
// 用户列表
function userlist (state=initUserList, action) {
    switch(action.type){
        case USER_LIST:
            return {...initUserList,userlist:action.data};
        case USER_LIST_MSG:
            return {...initUserList,msg:action.data};
        default:
            return state;
    }
}


// 聊天的reducer（chat）
const initChat = {
    // 消息列表的用户对象数组
    users:[],
    // 聊天的数据
    chatMsgs:[],
    // 消息的未读数量
    unreadMsg:0,
}
function chat (state=initChat, action) {
    switch(action.type){
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs } = action.data;
            return {users, chatMsgs};
        case RECEIVE_MSG:
            const {chatMsg} = action.data;
            return { users:state.users, chatMsgs:[...state.chatMsgs, chatMsg] };
        default:
            return state;
    }
}

export default combineReducers({
    user,
    userlist,
    chat,
});