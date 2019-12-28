// web主界面组件
import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import {
    CurrentUser,
    head_message_action,
} from '../../redux/actions';

import {bars} from '../../utils/bars'; 

import { connect } from 'react-redux';

import Cookie from 'js-cookie';

import Information from '../information/user-information'
import UserList from '../userlist/user-list';
import NavFooter from '../../component/nav-footer/nav-footer';
import BarHeader from '../../component/header/header';
import Message from '../message/message';
import Mind from '../mind/mind';
import Chat from '../chat/chat';

class Main extends PureComponent {

    static propsTypes = {
        CurrentUser: propTypes.func.isRequired,
        head_message_action: propTypes.func.isRequired,
    }


    setInitHeadMsg = (pathname) => {
        const  {type}  = this.props.user || {};
        const headMsg = bars.find(bar => {
            if(pathname === '/userlist' && type === 'dashen'){
                return bar.key === 'dashen';
            } else if (pathname === '/userlist' && type === 'laoban'){
                return bar.key === 'laoban';
            }else{
                return bar.path === pathname;
            }
        });
        this.props.head_message_action(headMsg.title);
    }


    componentDidMount(){
        const userId = Cookie.get('userid');
        const { _id } = this.props.user;
        if(userId && !_id){
            // 发送请求，获取_id
            this.props.CurrentUser();
        }
    }

    render() {
        const path = this.props.location.pathname;

        if(path === '/'){
            return <Redirect to='/userlist' />
        }

        const userId = Cookie.get('userid');
        const { _id } = this.props.user;
        // 1.cookie 中没有 userid ，自动跳转到登陆界面
        if (!userId) {
            return <Redirect to='/login' />
        }

        // 如果 _id 不存在，目前不做任何处理
        if(!_id){
            // 返回 null 的目的是不让 其进入 页面的渲染
            return null;
        }else{
            if(['/userlist','/message', '/mind'].indexOf(path) !== -1){
                this.setInitHeadMsg(path);
            }
        }

        return (
            <div style={{ height: '100%', background: '#eee'}}>
                {
                    (path === '/userlist' || path === '/message' || path === '/mind') ? <BarHeader /> : null
                }
                <Switch>
                    <Route path='/userlist' component={UserList}></Route>
                    <Route path='/message' component={Message}></Route>
                    <Route path='/mind' component={Mind}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route path='/information' component={Information}></Route>
                    <Route component={UserList}></Route>
                </Switch>
                {
                    (path === '/userlist' || path === '/message' || path === '/mind') ? <NavFooter /> : null
                }
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    {CurrentUser,head_message_action}
)(Main);