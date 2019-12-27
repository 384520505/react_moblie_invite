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

        // 统计 chatMsgs 中 to字段是 当前用户的 未读的消息
        const unreadMsgs = chatMsgs.filter(msg => (msg.to === _id && !msg.read));

        // 与当前用户互发消息的用户数组
        let usersAboutMe = {};

        // 获取与我聊天的用户 的消息分组
        let lastMsgObjs = {};

        // 获取与当前用户相关的其他用户
        chatMsgs.forEach(msg => {
            if (msg.from === _id || msg.to === _id) {
                const aboutUser_id = msg.from !== _id ? msg.from : msg.to;

                const chatId = [aboutUser_id, _id].sort().join('_');

                if (msg.chat_id === chatId) {
                    if (!lastMsgObjs[chatId]) {
                        lastMsgObjs[chatId] = msg;
                    } else {
                        if (msg.create_time > lastMsgObjs[chatId].create_time) {
                            lastMsgObjs[chatId] = msg;
                        }
                    }
                }

                usersAboutMe[aboutUser_id] = users[aboutUser_id];
                // 统计 unreadMsgs 中 from 为其他用户的个数
                const unreadNum = unreadMsgs.reduce((preTotal, msg) => preTotal + (msg.from === aboutUser_id ? 1 : 0), 0);
                usersAboutMe[aboutUser_id].unreadMsg = unreadNum;
            }
        });

        // 根据最后一条消息的时间排序用户列表
        // 1.将最后一条消息的对象转为数组，然后排序
        const lastMsgs = Object.values(lastMsgObjs)
        // 2.按照msg中create_time字段进行逆向排序
        lastMsgs.sort(function (m1, m2) { // 如果结果<0, 将m1放在前面, 如果结果为0, 不变, 如果结果>0, m2前面
            return m2.create_time - m1.create_time
        })
        // console.log(lastMsgs);

        // 将跟我有关的用户 按照聊天的最后一条消息的created_time字段的大小，从大到小进行排序
        const user_ids = lastMsgs.map( msg => {
            let user_id = '';
            if(msg.from === _id){
                user_id = msg.to;
            }else{
                user_id = msg.from;
            }
            // 向用户列表中添加 最后一条消息的数据
            usersAboutMe[user_id].lastMsg = msg;
            return user_id;
        } );
        return { user_ids, usersAboutMe };
    }


    handleClick = (_id) => {
        this.props.history.push(`/chat/${_id}`);
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
                                    extra={<Badge text={usersAboutMe[_id].unreadMsg} overflowCount={100} />}
                                    onClick={() => { this.handleClick(_id) }}
                                >
                                    <MessageBar userAboutMe={usersAboutMe[_id]} lastMsg={usersAboutMe[_id].lastMsg}>{usersAboutMe[_id].username}</MessageBar>
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