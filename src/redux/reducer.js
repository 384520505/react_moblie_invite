// reducer 函数： 通过 旧的 state 和 action 返回新的 state

import {combineReducers} from 'redux'

import {
    AUTH_USER,
    BACK_MSG,
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
            return {...state, ...action.data, redireTo:'/'};
        case BACK_MSG:
            return {...state, msg:action.data};
        default:
            return state;
    }
}

export default combineReducers({
    user,
});