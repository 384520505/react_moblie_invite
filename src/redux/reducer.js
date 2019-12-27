// reducer 函数： 通过 旧的 state 和 action 返回新的 state

import {combineReducers} from 'redux'

import {
    AUTH_USER,
    BACK_MSG,
    USER_LIST,
    USER_LIST_MSG,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    READED_MSG,
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
            const { users, chatMsgs,userId } = action.data;
            // 统计所有发送给当前用户的信息，判断这些信息，是否已读，然后统计个数
            const unreadMsg = chatMsgs.reduce((preTotal, msg)=>  preTotal + (!msg.read && msg.to === userId ? 1 : 0) ,0); 
            return {users, chatMsgs, unreadMsg};
        case RECEIVE_MSG:
            const {chatMsg} = action.data;
            return { 
                users:state.users, 
                chatMsgs:[...state.chatMsgs, chatMsg] , 
                unreadMsg: state.unreadMsg + (!chatMsg.read && chatMsg.to === action.data.userId ? 1 : 0),
            };
        case READED_MSG:
            const {count, from, to } = action.data;
            // 将chatMsgs中 from是当前用户， to是与正在聊天的用户     所对应的消息的read 字段设置为true
            state.chatMsgs.forEach(msg => {
                if(msg.from === from && msg.to === to && !msg.read){
                    msg.read = true;
                }
            });
            return {
                users:state.users,
                chatMsgs:state.chatMsgs.map(msg => {
                    if(msg.from===from && msg.to===to && !msg.read) { //将chatMsgs中已读的信息进行更新
                      return {...msg, read: true}
                    } else {// 不需要
                      return msg
                    }
                  }),
                unreadMsg:state.unreadMsg - count
            }
        default:
            return state;
    }
}

export default combineReducers({
    user,
    userlist,
    chat,
});