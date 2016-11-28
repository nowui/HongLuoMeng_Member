import React, {Component} from 'react'
import {withRouter, Link} from 'react-router'
import {createForm} from 'rc-form'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import Icon from 'antd-mobile/lib/icon'
import TabBar from 'antd-mobile/lib/tab-bar'
import Stepper from 'antd-mobile/lib/stepper'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/tab-bar/style/index.css'
import 'antd-mobile/lib/stepper/style/index.css'

class Cart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cartList: []
        }
    }

    componentDidMount() {
        this.load()
    }

    load = function (currentPage) {
        let self = this

        Helper.ajax({
            url: '/cart/list/get',
            data: {},
            success: function (data) {
                self.setState({
                    cartList: data
                })
            },
            complete: function () {
            }
        })
    }

    update = function (cart_id, product_amount) {
        let self = this

        Helper.ajax({
            url: '/cart/update',
            data: {
                cart_id: cart_id,
                product_amount: product_amount
            },
            success: function (data) {
                self.load()
            },
            complete: function () {
            }
        })
    }

    delete = function (cart_id) {
        let self = this

        Helper.ajax({
            url: '/cart/delete',
            data: {
                cart_id: cart_id
            },
            success: function (data) {
                self.load()
            },
            complete: function () {
            }
        })
    }

    onChange(cart_id, product_amount) {
        this.update(cart_id, product_amount)
    }

    onClickLeft() {
        this.props.router.goBack()
    }

    onClickPay() {
        let self = this

        self.props.form.validateFields((errors, values) => {
            let cartList = []

            for (let i = 0; i < self.state.cartList.length; i++) {
                let cart = self.state.cartList[i]
                cartList.push({
                    product_sku_id: cart.product_sku_id,
                    product_amount: cart.product_amount
                })
            }

            values.cartList = cartList
            //values.product_sku_id = self.state.cartList[0].product_sku_id
            //values.product_amount = self.state.cartList[0].product_amount
            values.order_pay_type = 'ALI_PAY'
            values.member_delivery_id = '4de037bc33324d58b7a1cb7c01c3ebde'

            Helper.ajax({
                url: '/order/cart/save',
                data: values,
                success: function (data) {
                },
                complete: function () {
                }
            })
        })
    }

    onClickListItem(id) {
        this.props.router.push({
            pathname: '/mycourse',
            query: {}
        })
    }

    render() {
        const {getFieldProps} = this.props.form

        return (
            <div>
                <div className="header">
                    <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)}>购物车</NavBar>
                </div>

                <div className="container">
                    <List style={{
                        marginTop: '40px'
                    }}>
                        {
                            this.state.cartList.map(function (cart, index) {
                                return (
                                    <List.Item key={cart.cart_id} extra={<Stepper {...getFieldProps('product_amount', {
                                        initialValue: cart.product_amount
                                    })} showNumber size="small" max={99} min={0}
                                                                                  onChange={this.onChange.bind(this, cart.cart_id)}/>}>
                                        {cart.product_name}
                                    </List.Item>
                                )
                            }.bind(this))
                        }
                    </List>
                    <List style={{
                        marginTop: '40px'
                    }}>
                        <InputItem {...getFieldProps('order_message', {
                            initialValue: '买买买'
                        })}
                                   clear
                                   placeholder="请输入买家留言"
                        >
                            买家留言
                        </InputItem>
                    </List>

                    <div style={{
                        margin: '100px 20px 100px 20px'
                    }}>
                        <Button type="primary" onClick={this.onClickPay.bind(this)}>付款</Button>
                    </div>
                </div>
            </div>
        )
    }
}

Cart = createForm({})(Cart)

export default withRouter(Cart)