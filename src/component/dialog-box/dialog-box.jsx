// 聊天 内容框 组件

import React, { PureComponent } from 'react';
import porpTypes from 'prop-types'

import './dialog-box.less';

class DialogBox extends PureComponent {

    static propsTypes = {
        chat: porpTypes.object.isRequired,
        redireUser: porpTypes.object.isRequired,
        user: porpTypes.string.isRequired
    }

    state = {
        // 聊天内容显示的方向，默认再左边
        direction: 'left',
        // 自己的头像
        meHeader:'',
        // 聊天对象的头像
        redireHeader:'',
    }

    getChatMessage = () => {
        const { from } = this.props.chat;
        const _id = this.props.user._id;
        if (_id === from) {
            this.setState({ direction: 'right' });
        }
    }

    getHeaderPic = () => {
        const { header } = this.props.redireUser;
        const userHeader = this.props.user.header;
        this.setState({
            meHeader:require(`../../assect/header/${userHeader}.png`),
            redireHeader:require(`../../assect/header/${header}.png`),
        });
    }

    componentWillMount() {
        this.getChatMessage();
        this.getHeaderPic();
    }

    render() {
        return (
            <div>
                {
                    this.state.direction === 'right' ? (
                        <div className='dialog-wrap dialop-right'>
                            <div className='dialog-box-right'>
                                {this.props.children}
                            </div>
                            <div className="headerLogo-right">
                                <img src={this.state.meHeader} alt="" />
                            </div>
                        </div>
                    ) : (
                            <div className='dialog-wrap dialop-left'>
                                <div className="headerLogo-left">
                                    <img src={this.state.redireHeader} alt="" />
                                </div>
                                <div className='dialog-box-left'>
                                    {this.props.children}
                                </div>
                            </div>
                        )
                }
            </div>
        );
    }
}

export default DialogBox;