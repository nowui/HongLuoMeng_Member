import React, {Component} from 'react'
import {withRouter, Link} from 'react-router'
import Helper from '../../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Button from 'antd-mobile/lib/button'
import Icon from 'antd-mobile/lib/icon'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'

class Order extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.load()
    }

    load = function (currentPage) {
        let self = this

        Helper.ajax({
            url: '/topic/list/get',
            data: {
                topic_status: '',
                page: 1,
                limit: 5
            },
            success: function (data) {
                self.setState({
                    list: data
                })
            },
            complete: function () {
            }
        })
    }

    onClickAdd() {
        this.props.router.push({
            pathname: '/topic/add',
            query: {

            }
        })
    }

    onClickListItem(id) {
        this.props.router.push({
            pathname: '/topic/edit/' + id,
            query: {}
        })
    }

    onClickLeft() {
        this.props.router.goBack()
    }

    render() {
        return (
            <div>
                <div className="header">
                    <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)} rightContent={[<div key="0" onClick={this.onClickAdd.bind(this)}>新增</div>]}>我的订单</NavBar>
                </div>
                <div className="container">
                    <List>
                        {
                            this.state.list.map(function (item, index) {
                                return (
                                    <List.Item key={index} arrow="horizontal"
                                               onClick={this.onClickListItem.bind(this, item.topic_id)}>
                                        <div style={{
                                            marginTop: '20px',
                                            height: '50px'
                                        }}><span style={{
                                            color: '#777777'
                                        }}>文字:</span> {item.topic_text}</div>
                                        <div style={{
                                            height: '50px'
                                        }}><span style={{
                                            color: '#777777'
                                        }}>图片:</span> {item.topic_image}</div>
                                    </List.Item>
                                )
                            }.bind(this))
                        }
                    </List>
                </div>
            </div>
        )
    }
}

export default withRouter(Order)