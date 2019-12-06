// 用户注册组件
import React, { PureComponent } from 'react';

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

const ListItem = List.Item;

class Register extends PureComponent {


    state = {
        username: '', //用户名
        password: '', //密码
        rePassword: '', //确认密码
        userType: 1  // 用户类型： 1：大神， 2：BOSE
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        });
    }

    // 收集注册数据
    getRegister = () => {
        console.log(this.state);
    }


    render() {
        const { userType } = this.state;

        return (
            <div className='register-page'>
                <NavBar
                    mode='dark'
                >BOSE&nbsp;直&nbsp;聘</NavBar>
                <WingBlank>
                    <List style={{ marginTop: '100px' }}>
                        <InputItem onChange={val => { this.handleChange('username', val) }}>用户名：</InputItem>
                        <InputItem onChange={val => { this.handleChange('password', val) }} type='password'>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <InputItem onChange={val => { this.handleChange('rePassword', val) }} type='password'>确认密码：</InputItem>
                        <ListItem>
                            <span>选则类型：</span>&nbsp;&nbsp;
                            <Radio
                                className='register-radio'
                                checked={userType === 1}
                                onChange={() => { this.handleChange('userType', 1) }}
                            >大神</Radio>&nbsp;&nbsp;
                            <Radio
                                className='register-radio'
                                checked={userType === 2}
                                onChange={() => { this.handleChange('userType', 2) }}
                            >BOSE</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.getRegister} style={{ fontSize: '16px' }} type='primary'>注&nbsp;册</Button>
                    <WhiteSpace />
                    <Button onClick={() => {this.props.history.replace('/login')}} style={{ fontSize: '16px' }} >注&nbsp;册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register;