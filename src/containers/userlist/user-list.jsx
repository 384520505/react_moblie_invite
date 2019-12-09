import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

import {
    Card,
    WingBlank,
    WhiteSpace,
} from 'antd-mobile';

import { connect } from 'react-redux';

import { getUserList } from '../../redux/actions';

class UserList extends PureComponent {

    static propsTypes = {
        user: propTypes.object.isRequired,
        userlist: propTypes.array.isRequired,
        getUserList: propTypes.func.isRequired,
    }

    componentDidMount() {
        // 获取用户列表
        this.props.getUserList(this.props.user.type === 'laoban' ? 'dashen' : 'laoban');
    }

    render() {
        const { userlist } = this.props.userlist;

        return (<div style={{ padding: '45px 0 50px 0' }}>
            <WingBlank>
                {
                    userlist.length > 0 ? (userlist.map(user => {
                        return (
                            <div key={user._id}>
                                <WhiteSpace />
                                <Card>
                                    <Card.Header
                                        // title='hello'
                                        thumb={require(`../../assect/header/${user.header}.png`)}
                                        extra={user.username}
                                    />
                                    <Card.Body>
                                        <div>{user.post}</div>
                                        <div>{user.info}</div>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })) : null
                }
            </WingBlank>
        </div>);
    }
}

export default connect(
    state => ({
        userlist: state.userlist,
        user: state.user
    }),
    { getUserList }
)(UserList);