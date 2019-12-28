// 公共的头部组件

import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';

import './header.less';

import {
    NavBar,
} from 'antd-mobile';

class BarHeader extends PureComponent {


    static propsTypes = {
        user: propTypes.object.isRequired,
        headMessage: propTypes.string.isRequired,
    }

    render() {

        // const { header } = this.props.user;
        const {headMessage} = this.props;

        return (<div className='bar-header'>
            <NavBar
                // leftContent={header ? (<span className='navbar-left'><img src={require(`../../assect/header/${header}.png`)} alt='头像' /></span>) : null}
            >{headMessage}</NavBar>
        </div>);
    }
}

export default connect(
    state => ({ user: state.user, headMessage: state.headMessage })
)(BarHeader);