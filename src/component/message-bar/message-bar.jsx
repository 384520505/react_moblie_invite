// message 界面的 消息条

import React, { PureComponent } from 'react'
import propTypes from 'prop-types';

import './message-bar.less'


class MessageBar extends PureComponent {

    static propsTypes = {
        userAboutMe: propTypes.object.isRequired,
        lastMsg: propTypes.object.isRequired,
    }

    render() {
        const { children, userAboutMe: { header }, lastMsg } = this.props;
        return (
            <div style={{ display: 'flex', paddingLeft: '5px' }}>
                <div className="headerLogo">
                    <img src={require(`../../assect/header/${header}.png`)} alt="" />
                </div>
                <div className="messageBar_right">
                    <div className="message_username">{children}</div>
                    <div className="message_content">{lastMsg.content}</div>
                </div>
            </div>
        );
    }
}

export default MessageBar;