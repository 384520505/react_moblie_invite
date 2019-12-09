// 注册界面的信息完善界面

import React, { Component } from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';

import {
    WhiteSpace,
    NavBar,
    Grid,
    List,
    InputItem,
    TextareaItem,
    Button,
} from 'antd-mobile';

import { MessageAction } from '../../redux/actions';

import './user-information.less';


class Information extends Component {

    static propsTypes = {
        user: propTypes.object.isRequired,
        MessageAction: propTypes.func.isRequired,
    }

    state = {
        headerPicture: '',//头像图片
        header: '',      //头像名称
        post: '',         //招聘职位
        info: '',         //介绍
        salary: '',       //薪资
        company: '',      //公司
    }

    // 获取头像数据
    getHeader = () => {
        let pictureArray = [];
        for (let i = 0; i < 20; i++) {
            const picture = require(`../../assect/header/头像${i + 1}.png`);
            pictureArray.push(picture);
        }
        return pictureArray;
    }

    // 获取Gird 的数据
    getGird = () => {
        const pictureText = [
            '头像1','头像2','头像3','头像4','头像5',
            '头像6','头像7','头像8','头像9','头像10',
            '头像11','头像12','头像13','头像14','头像15',
            '头像16','头像17','头像18','头像19','头像20',
        ];
        const pictureData = this.getHeader().map((val, i) => ({
            icon: val,
            text: pictureText[i],
        }));

        return pictureData;
    }

    // 图片列表的点击事件
    handleClick = (girdItem) => {
        this.setState({
            headerPicture: girdItem.icon,
            header: girdItem.text
        });
    }

    // input 的change事件
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        });
    }

    // 用户信息提交
    userMessage = () => {
        const { header, info, salary, post, company } = this.state;
        const user = { header, info, salary, post, company };
        this.props.MessageAction(user);
        this.props.history.replace('/userlist');
    }

    render() {

        const { headerPicture } = this.state;
        const { type, msg } = this.props.user;
        return (
            <div style={{ height: '100%' }}>
                <NavBar
                    leftContent={<span className='navbar-left'>{headerPicture ? <img src={headerPicture} alt='头像' /> : null}</span>}
                >{msg ? msg : '完善信息'}</NavBar>
                <Grid
                    data={this.getGird()}
                    onClick={this.handleClick}
                    columnNum={5}
                    renderItem={dataItem => (
                        <div style={{ padding: '0' }}>
                            <img src={dataItem.icon} style={{ width: '50px', height: '50px', marginTop: '5px' }} alt="" />
                            <div style={{ color: '#888', fontSize: '12px', marginTop: '5px' }}>
                                <span>{dataItem.text}</span>
                            </div>
                        </div>
                    )}
                    itemStyle={{ height: '80px' }}
                />
                <List>
                    <InputItem onChange={val => { this.handleChange('post', val) }}>{(type === 'laoban') ? '招聘职位：' : '求职岗位：'}</InputItem>
                    {
                        (type === 'laoban') ? (<InputItem onChange={val => { this.handleChange('company', val) }}>公司名称：</InputItem>) : null
                    }
                    {
                        (type === 'laoban') ? (<InputItem onChange={val => { this.handleChange('salary', val) }}>职位薪资：</InputItem>) : null
                    }
                    <TextareaItem
                        title={(type === 'lanbao') ? '职位要求：' : '个人介绍：'}
                        rows={3}
                        onChange={val => { this.handleChange('info', val) }}
                    ></TextareaItem>
                    <WhiteSpace />
                    <Button onClick={this.userMessage} style={{ margin: '0 5px' }} type='primary'>提&nbsp;交</Button>
                    <WhiteSpace />
                </List>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { MessageAction }
)(Information);