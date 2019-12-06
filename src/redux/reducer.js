// reducer 函数： 通过 旧的 state 和 action 返回新的 state

import {combineReducers} from 'redux'

function xxx (state=0, action) {
    return state;
}

function yyy (state=0,action) {
    return state;
}

export default combineReducers({
    xxx,
    yyy
});