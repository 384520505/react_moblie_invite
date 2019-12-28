// 用户登陆组件
import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

import {
    NavBar,
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Button,
} from 'antd-mobile';

import {
    Redirect,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { loginAction } from '../../redux/actions';

class Login extends PureComponent {

    static propsTypes = {
        user: propTypes.object.isRequired,
        reqLogin: propTypes.func.isRequired,
    }

    state = {
        username: '', //用户名
        password: '', //密码
    }

    handleChnage = (name, val) => {
        this.setState({
            [name]: val,
        });
    }

    getLogin = () => {
        this.props.loginAction(this.state); 
    }

    render() {

        const { msg, redireTo } = this.props.user;

        if(redireTo){
            return <Redirect to={redireTo} />
        }

        return (
            <div>
                <NavBar>{msg ? msg : 'BOSE 直 聘'}</NavBar>
                <WingBlank>
                    <List style={{ marginTop: '150px' }}>
                        <InputItem clear onChange={val => this.handleChnage('username', val)}>用户名：</InputItem>
                        <InputItem clear onChange={val => this.handleChnage('password', val)} type='password' >密&nbsp;&nbsp;&nbsp;&nbsp;码：</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button style={{background:'#21adaa'}} onClick={this.getLogin} type='primary'>登陆</Button>
                    <WhiteSpace />
                    <Button onClick={() => { this.props.history.push('/register') }} >注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { loginAction }
)(Login);