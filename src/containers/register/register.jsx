// 用户注册组件
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

import propTypes from 'prop-types';

import './register.less'
import {
    NavBar,
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Radio,
    Button,
} from 'antd-mobile';

import {
    registerAction,
} from '../../redux/actions';

import { connect } from 'react-redux';

const ListItem = List.Item;

class Register extends PureComponent {

    static propsTypes = {
        user: propTypes.object.isrequired,
        registerAction: propTypes.func.isrequired,
    }

    state = {
        username: '', //用户名
        password: '', //密码
        rePassword: '', //确认密码
        type: 'dashen',  // 用户类型
        msg: ''
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val,
        });
    }

    // 收集注册数据
    getRegister = () => {
        this.props.registerAction(this.state);
    }


    render() {
        const { type } = this.state;
        const { msg, redireTo } = this.props.user;

        if(redireTo){
            return <Redirect to={redireTo} />
        }
        
        return (
            <div className='register-page'>
                <NavBar
                    mode='dark'
                >{msg ? <span >{msg}</span> : 'BOSE 直 聘'}</NavBar>
                <WingBlank>
                    <List style={{ marginTop: '100px' }}>
                        <InputItem clear onChange={(val) => { this.handleChange('username', val) }}>用户名：</InputItem>
                        <InputItem clear type='password' onChange={(val) => { this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <InputItem clear type='password' onChange={(val) => { this.handleChange('rePassword', val) }}>确认密码：</InputItem>
                        <ListItem>
                            <span>选则类型：</span>&nbsp;&nbsp;
                            <Radio
                                className='register-radio'
                                checked={type === 'dashen'}
                                onChange={() => { this.handleChange('type', 'dashen') }}
                            >大神</Radio>&nbsp;&nbsp;
                            <Radio
                                className='register-radio'
                                checked={type === 'laoban'}
                                onChange={() => { this.handleChange('type', 'laoban') }}
                            >BOSE</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace />
                    <Button
                        onClick={() => { this.getRegister() }}
                        style={{ fontSize: '16px' }}
                        type='primary'>注&nbsp;册</Button>
                    <WhiteSpace />
                    <Button
                        onClick={() => { this.props.history.replace('/login') }}
                        style={{ fontSize: '16px' }}
                    >登&nbsp;册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { registerAction }
)(Register);