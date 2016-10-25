import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import { Form, Upload } from 'antd'
import Helper from '../../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Icon from 'antd-mobile/lib/icon'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'
import InputItem from 'antd-mobile/lib/input-item'
import Stepper from 'antd-mobile/lib/stepper'

import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/stepper/style/index.css'

class ProductIndex extends Component {

  constructor(props) {
    super(props)

    this.state = {
      product: {
        productSkuList: [
          {
            product_price: 0.00,
            product_stock: 0
          }
        ]
      }
    }
  }

  componentDidMount() {
    this.load()
  }

  load = function() {
    let self = this

    Helper.ajax({
      url: '/product/get',
      data: {
        product_id: self.props.params.product_id
      },
      unLoad: false,
      success: function(data) {
        self.setState({
          product: data
        })
      },
      complete: function() {

      }
    })
  }

  onChange(value) {
    this.props.form.setFieldsValue({
      cart_product_number: value
    })
  }

  onClickLeft() {
    this.props.router.goBack()
  }

  onClickCart() {
    let self = this

    Helper.ajax({
      url: '/cart/save',
      data: {
        product_sku_id: this.state.product.productSkuList[0].product_sku_id,
        cart_product_number: this.props.form.getFieldValue('cart_product_number')
      },
      success: function(data) {
        Toast.success('操作成功', Helper.duration)
      },
      complete: function() {

      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <div className="header">
          <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)} rightContent={[<Link key="0" to={"/cart"}>购物车</Link>]}>{this.state.product.product_name}</NavBar>
        </div>

        <div className="container">
          <List style={{ marginTop: '40px' }}>
            <List.Body>
                <List.Item extra={this.state.product.productSkuList[0].product_price}>
                  产品价格
                </List.Item>
                <List.Item extra={this.state.product.productSkuList[0].product_stock}>
                  产品库存
                </List.Item>
                <List.Item extra={<Stepper {...getFieldProps('cart_product_number', {initialValue: '1'})} showNumber size="small" max={99} min={1} onChange={this.onChange.bind(this)} />}>
                  购买量
                </List.Item>
            </List.Body>
          </List>

          <div style={{ margin: '100px 20px 0px 20px'}}>
            <Button type="primary" onClick={this.onClickCart.bind(this)}>加入购物车</Button>
          </div>
        </div>
      </div>
    )
  }
}

ProductIndex = Form.create({

})(ProductIndex)

export default withRouter(ProductIndex)