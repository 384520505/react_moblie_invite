// 聊天组件

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import BarHeader from '../../component/header/header';
import DialogBox from '../../component/dialog-box/dialog-box';

import {
    InputItem,
    Grid,
    NavBar,
    Icon
} from 'antd-mobile';

import { emojis } from '../../utils/emoji';

import { sendMsg } from '../../redux/actions'

import './chat.less';

class Chat extends PureComponent {

    static propsTypes = {
        sendMsg: propTypes.func.isRequired,
        // 当前登陆的用户信息
        user: propTypes.object.isRequired,
        // 聊天的数据
        chat: propTypes.object.isRequired,
    }


    state = {
        // 发送的信息
        msg: '',
        // 是否显示表情包，默认不显示
        isShow: false,
    }

    getEmojis = () => {
        return emojis.map(emoji => ({
            text: emoji,
        }));
    }

    // 获取与当前用户相关的信息
    getChats = () => {
        const { userid } = this.props.match.params;
        const { user: { _id }, chat: { chatMsgs, users } } = this.props;
        const chat_id = [userid, _id].sort().join('_');
        // 获取与当前用户相关的消息
        let chatAboutMe = chatMsgs.filter(msg => {
            return msg.chat_id === chat_id;
        });
        // 按时间排序消息
        chatAboutMe = chatAboutMe.sort((msg1, msg2) => {
            return msg1.create_time - msg2.create_time;
        });

        // 获取聊天的对象
        this.redireUser = users[userid];

        return chatAboutMe;
    }

    // 显示表情包
    isShow = () => {
        this.setState({ isShow: true });
        // 异步手动派发resize事件,解决表情列表显示的bug
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    // 输入框聚焦
    focus = () => {
        this.setState({ isShow: false });

    }

    // 获取输入框中的信息
    getMsg = (val) => {
        this.setState({ msg: val });
    }

    // 发送消息
    sentMsg = () => {
        const { msg } = this.state;
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        if (msg.trim()) {
            // 发送消息请求
            this.props.sendMsg({ from, to, content: msg });
            this.setState({ msg: '' });
        }
    }

    // 返回按钮
    leftClick = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        this.emojis = this.getEmojis();
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }


    render() {
        const { isShow, msg } = this.state;

        const chatAboutMe = this.getChats();
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)

        return (
            <div style={{ padding: '45px 0 50px 0' }}>
                <NavBar 
                style={{position:'fixed', top:0, width:'100%', zIndex:1}}
                onLeftClick={this.leftClick}
                    icon={<Icon type="left" />}
                >bose</NavBar>
                <div style={{ padding: '5px 10px' }}>
                    {
                        chatAboutMe.map(chat => {
                            return (
                                <DialogBox
                                    redireUser={this.redireUser}
                                    chat={chat}
                                    user={this.props.user}
                                    key={chat._id}
                                >
                                    {chat.content}
                                </DialogBox>
                            );
                        })
                    }
                </div>
                <div className='footer-input'>
                    <InputItem
                        value={msg}
                        onChange={(val) => { this.getMsg(val) }}
                        extra={
                            <span className='inupt-right'>
                                <span className='emoji' onClick={this.isShow}>😀</span>
                                <span onClick={this.sentMsg} className='sendBTN'>发送</span>
                            </span>
                        }
                        onFocus={this.focus}
                    ></InputItem>
                    {
                        isShow ? (
                            <Grid
                                data={this.emojis}
                                renderItem={emoji => (
                                    <div key={1} >
                                        <div style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>
                                            <span style={{ fontSize: 30 }}>{emoji.text}</span>
                                        </div>
                                    </div>
                                )}
                                hasLine={false}
                                columnNum={8}
                                isCarousel
                                carouselMaxRow={4}
                            />
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg }
)(Chat);