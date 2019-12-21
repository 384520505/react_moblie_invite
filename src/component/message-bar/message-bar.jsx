// message 界面的 消息条

import React, { PureComponent } from 'react'
import propTypes from 'prop-types';

import './message-bar.less'


class MessageBar extends PureComponent {

    static propsTypes = {
        userAboutMe: propTypes.object.isRequired,
    }

    render() {
        const { children, userAboutMe:{header} } = this.props;
        return (
            <div style={{ display: 'flex',paddingLeft:'5px' }}>
                <div className="headerLogo">
                    <img src={require(`../../assect/header/${header}.png`)} alt="" />
                </div>
                <div className="text">{children}</div>
            </div>
        );
    }
}

export default MessageBar;