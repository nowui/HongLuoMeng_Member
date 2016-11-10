import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import { createForm } from 'rc-form'
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

  load = function(currentPage) {
    let self = this

    Helper.ajax({
      url: '/cart/list/get',
      data: {},
      success: function(data) {
        self.setState({
          cartList: data
        })
      },
      complete: function() {

      }
    })
  }

  update = function(cart_id, cart_product_amount) {
    let self = this

    Helper.ajax({
      url: '/cart/update',
      data: {
        cart_id: cart_id,
        cart_product_amount: cart_product_amount
      },
      success: function(data) {
        self.load()
      },
      complete: function() {

      }
    })
  }

  delete = function(cart_id) {
    let self = this

    Helper.ajax({
      url: '/cart/delete',
      data: {
        cart_id: cart_id
      },
      success: function(data) {
        self.load()
      },
      complete: function() {

      }
    })
  }

  onChange(cart_id, cart_product_amount) {
    if(cart_product_amount == 0) {
      this.delete(cart_id)
    } else {
      this.update(cart_id, cart_product_amount)
    }
  }

  onClickLeft() {
    this.props.router.goBack()
  }

  onClickPay() {
    let self = this

    self.props.form.validateFields((errors, values) => {
      let cartList = []

      for(let i = 0; i < self.state.cartList.length; i++) {
        let cart = self.state.cartList[i]

        cartList.push({
          product_sku_id: cart.product_sku_id,
          cart_product_amount: cart.cart_product_amount
        })
      }

      values.cartList = cartList

      Helper.ajax({
        url: '/order/save',
        data: values,
        success: function(data) {

        },
        complete: function() {

        }
      })
    })
  }

  onClickListItem(id) {
    this.props.router.push({
      pathname: '/mycourse',
      query: {

      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <div className="header">
          <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)}>购物车</NavBar>
        </div>

        <div className="container">
          <List style={{ marginTop: '40px' }}>
            <List.Body>
              {
                this.state.cartList.map(function (cart, index) {
                  return (
                    <List.Item key={cart.cart_id} extra={<Stepper {...getFieldProps('cart_product_amount', {initialValue: cart.cart_product_amount})} showNumber size="small" max={99} min={0} onChange={this.onChange.bind(this, cart.cart_id)} />}>
                      {cart.product_name}
                    </List.Item>
                  )
                }.bind(this))
              }
            </List.Body>
          </List>
          <List style={{ marginTop: '40px' }}>
            <List.Body>
                <InputItem {...getFieldProps('order_message', {
                  initialValue: '买买买'
                })}
                clear
                placeholder="请输入买家留言"
                >
                  买家留言
                </InputItem>

                <InputItem {...getFieldProps('order_delivery_name', {
                  initialValue: '钟永强'
                })}
                clear
                placeholder="请输入收货人"
                >
                  收货人
                </InputItem>

                <InputItem {...getFieldProps('order_delivery_phone', {
                  initialValue: '15900672218'
                })}
                clear
                placeholder="请输入联系电话"
                >
                  联系电话
                </InputItem>

                <InputItem {...getFieldProps('order_delivery_province', {
                  initialValue: '4ac8cf8a44404bf6b2eeb01a8642efa5'
                })}
                clear
                placeholder="请输入省份"
                >
                  省份
                </InputItem>

                <InputItem {...getFieldProps('order_delivery_city', {
                  initialValue: '5a144651cf184628af38c7a838d479d5'
                })}
                clear
                placeholder="请输入城市"
                >
                  城市
                </InputItem>

                <InputItem {...getFieldProps('order_delivery_area', {
                  initialValue: 'b730987ddc8b4eb39e35270987b8c573'
                })}
                clear
                placeholder="请输入地区"
                >
                  地区
                </InputItem>

                <InputItem {...getFieldProps('order_delivery_address', {
                  initialValue: '联航路1188号9幢'
                })}
                clear
                placeholder="请输入详细地址"
                >
                  详细地址
                </InputItem>

                <InputItem {...getFieldProps('order_delivery_zip', {
                  initialValue: '201100'
                })}
                clear
                placeholder="请输入邮政编码"
                >
                  邮政编码
                </InputItem>
            </List.Body>
          </List>

          <div style={{ margin: '100px 20px 100px 20px'}}>
            <Button type="primary" onClick={this.onClickPay.bind(this)}>付款</Button>
          </div>
        </div>
      </div>
    )
  }
}

Cart = createForm({

})(Cart)

export default withRouter(Cart)