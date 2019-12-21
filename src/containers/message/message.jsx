// 消息组件

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import './message.less';
import MessageBar from '../../component/message-bar/message-bar'

import {
    SwipeAction,
    List,
    Badge
} from 'antd-mobile';

class Message extends PureComponent {

    static propsTypes = {
        // 关于聊天的数据
        chat: propTypes.object.isRequired,
        // 当前登陆的用户
        user: propTypes.object.isRequired,
    }

    // 获取与当前用户相关的 其他用户
    getAboutUsers = () => {
        const { user: { _id }, chat: { users, chatMsgs } } = this.props;
        // 与当前用户互发消息的用户数组
        let usersAboutMe = {};

        // 获取与当前用户相关的用户
        chatMsgs.forEach(msg => {
            if (msg.from === _id || msg.to === _id) {
                const aboutUser_id = msg.from !== _id ? msg.from : msg.to;
                usersAboutMe[aboutUser_id] = users[aboutUser_id];
            }
        });

        // 根据最后一条消息的时间排序用户列表

        
        // 获取相关用户的数据
        const user_ids = Object.keys(usersAboutMe)
        return { user_ids, usersAboutMe };
    }


    handleClick = (_id) => {
        this.props.history.push(`/chat/${_id}`)
    }

    render() {
        const { usersAboutMe, user_ids } = this.getAboutUsers();
        return (<div style={{ padding: '45px 0 50px 0' }}>
            <List>
                {
                    user_ids.map(_id => {
                        return (
                            <SwipeAction
                                key={_id}
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('cancel'),
                                        style: { backgroundColor: '#ddd', color: 'white' },
                                    },
                                    {
                                        text: 'Delete',
                                        onPress: () => console.log('delete'),
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                    },
                                ]}
                                left={[
                                    {
                                        text: 'Reply',
                                        onPress: () => console.log('reply'),
                                        style: { backgroundColor: '#108ee9', color: 'white' },
                                    },
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('cancel'),
                                        style: { backgroundColor: '#ddd', color: 'white' },
                                    },
                                ]}
                                onOpen={() => console.log('global open')}
                                onClose={() => console.log('global close')}
                            >
                                <List.Item
                                    arrow="horizontal"
                                    extra={<Badge text={11} overflowCount={100} />}
                                    onClick={() => {this.handleClick(_id)}}
                                >
                                    <MessageBar userAboutMe={usersAboutMe[_id]}>{usersAboutMe[_id].username}</MessageBar>
                                </List.Item>
                            </SwipeAction>
                        );
                    })
                }
            </List>
        </div>);
    }
}

export default connect(
    state => ({ chat: state.chat, user: state.user }),
    {}
)(Message);