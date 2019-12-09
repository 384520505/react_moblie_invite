// 我的界面组件

import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

import './mind.less';

import { connect } from 'react-redux';

import {
    List,
} from 'antd-mobile';

const Brief = List.Item.Brief;

class Mind extends PureComponent {

    static propsTypes = {
        user: propTypes.object.isRequired,
    }

    render() {
        const { header, username, post } = this.props.user;

        return (<div style={{ padding: '45px 0 50px 0' }}>
            <List>
                <List.Item
                    arrow='horizontal'
                    thumb={require(`../../assect/header/${header}.png`)}
                    multipleLine
                >
                    {username}<Brief style={{fontSize:'12px'}}>职位：{post}</Brief>
                </List.Item>
                <List.Item
                    arrow='horizontal'
                // thumb={require(`../../assect/header/${header}.png`)}
                >
                    收藏
                </List.Item>
                <List.Item
                    arrow='horizontal'
                // thumb={require(`../../assect/header/${header}.png`)}
                >
                    支付
                </List.Item>
                <List.Item
                    arrow='horizontal'
                // thumb={require(`../../assect/header/${header}.png`)}
                >
                    卡片
                </List.Item>
            </List>
        </div>);
    }
}

export default connect(
    state => ({ user: state.user })
)(Mind);