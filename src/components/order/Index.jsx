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
            url: '/order/list/get',
            data: {
                order_flow_status: '',
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

    onClickListItem(id) {
        return
        this.props.router.push({
            pathname: '/order/edit/' + id,
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
                    <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)}>我的订单</NavBar>
                </div>
                <div className="container">
                    <List>
                        {
                            this.state.list.map(function (item, index) {
                                return (
                                    <List.Item key={index} arrow="horizontal"
                                               onClick={this.onClickListItem.bind(this, item.member_delivery_id)}>
                                        <div style={{
                                            marginTop: '20px',
                                            height: '50px'
                                        }}><span style={{
                                            color: '#777777'
                                        }}>订单号:</span> {item.order_no}</div>
                                        <div style={{
                                            height: '50px'
                                        }}><span style={{
                                            color: '#777777'
                                        }}>商品数量:</span> {item.order_product_pay_amount}</div>
                                        <div style={{
                                            marginBottom: '20px'
                                        }}><span style={{
                                            color: '#777777'
                                        }}>价格合计:</span> {item.order_pay_price}</div>
                                        <div style={{
                                            marginBottom: '20px'
                                        }}><span style={{
                                            color: '#777777'
                                        }}>状态:</span> {item.order_flow_status}</div>
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