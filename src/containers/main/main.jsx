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
} from '../../redux/actions';

import { connect } from 'react-redux';

import Cookie from 'js-cookie';

import Information from '../information/user-information'
import UserList from '../userlist/user-list';
import NavFooter from '../../component/nav-footer/nav-footer';
import BarHeader from '../../component/header/header';
import Message from '../message/message';
import Mind from '../mind/mind';

class Main extends PureComponent {

    static propsTypes = {
        CurrentUser: propTypes.func.isRequired,
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
        } 
        const path = this.props.location.pathname;

        return (
            <div style={{ height: '100%', background: '#eee'}}>
                {
                    (path === '/login' || path === '/register' || path === '/information') ? null : <BarHeader />
                }
                <Switch>
                    <Route path='/userlist' component={UserList}></Route>
                    <Route path='/message' component={Message}></Route>
                    <Route path='/mind' component={Mind}></Route>
                    <Route path='/information' component={Information}></Route>
                </Switch>
                {
                    (path === '/login' || path === '/register' || path === '/information') ? null : <NavFooter />
                }
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    {CurrentUser}
)(Main);