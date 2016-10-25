import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import { Form, Spin } from 'antd'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Button from 'antd-mobile/lib/button'
import Icon from 'antd-mobile/lib/icon'
import TabBar from 'antd-mobile/lib/tab-bar'
import Stepper from 'antd-mobile/lib/stepper'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/tab-bar/style/index.css'
import 'antd-mobile/lib/stepper/style/index.css'

class Cart extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoad: false,
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

  update = function(cart_id, cart_product_number) {
    let self = this

    Helper.ajax({
      url: '/cart/update',
      data: {
        cart_id: cart_id,
        cart_product_number: cart_product_number
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

  onChange(cart_id, cart_product_number) {
    if(cart_product_number == 0) {
      this.delete(cart_id)
    } else {
      this.update(cart_id, cart_product_number)
    }
  }

  onClickLeft() {
    this.props.router.goBack()
  }

  onClickLogout() {
    Helper.logout()

    this.props.router.push({
      pathname: '/login',
      query: {

      }
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
      <Spin size="large" spinning={this.state.isLoad}>
        <div className="header">
          <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)}>购物车</NavBar>
        </div>

        <div className="container">
          <List style={{ marginTop: '40px' }}>
            <List.Body>
              {
                this.state.cartList.map(function (cart, index) {
                  return (
                    <List.Item key={cart.cart_id} extra={<Stepper {...getFieldProps('cart_product_number', {initialValue: cart.cart_product_number})} showNumber size="small" max={99} min={0} onChange={this.onChange.bind(this, cart.cart_id)} />}>
                      {cart.product_name}
                    </List.Item>
                  )
                }.bind(this))
              }
            </List.Body>
          </List>

          <div style={{ margin: '100px 20px 0px 20px'}}>
            <Button type="primary">付款</Button>
          </div>
        </div>
      </Spin>
    )
  }
}

Cart = Form.create({

})(Cart)

export default withRouter(Cart)