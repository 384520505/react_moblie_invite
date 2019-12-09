// 底部导航条组件

import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import './nav-footer.less'

import {
    TabBar,
} from 'antd-mobile'

import {connect} from 'react-redux';

import { bars } from '../../utils/bars';


class NavFooter extends PureComponent {

    static propsTypes = {
        user: propTypes.object.isRequired,
    }

    componentWillMount() {
        this.bars = bars;
        // 判断当前的用户类型的是谁,并相应的隐藏
        const { type } = this.props.user;
        if(type === 'dashen'){
            this.bars[1].hide = true;
        }else{
            this.bars[0].hide = true;
        }

        // 返回没有隐藏的 navbar
        this.bars = this.bars.filter(barItem => !barItem.hide);
    }

    render() {

        const path = this.props.location.pathname;

        return (<div className='nav-footer'>
            <TabBar
                tintColor='#00c7b5'
            >
                {
                    this.bars.map(barItem => {
                        return <TabBar.Item
                            title={barItem.title}
                            key={barItem.key}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${barItem.icon}) center center /  21px 21px no-repeat`
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${barItem.selectedIcon}) center center /  21px 21px no-repeat`
                            }}
                            />
                            }
                            selected={barItem.path === path}
                            onPress={() => {
                                this.props.history.replace(barItem.path);
                            }}
                        />
                    })
                }
            </TabBar>
        </div>);
    }
}

export default withRouter(connect(
    state => ({user: state.user}),
)(NavFooter));