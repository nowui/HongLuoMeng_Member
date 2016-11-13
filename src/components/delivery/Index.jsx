import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import Helper from '../../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Button from 'antd-mobile/lib/button'
import Icon from 'antd-mobile/lib/icon'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'

class Delivery extends Component {

  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.load()
  }

  load = function(currentPage) {
    let self = this

    Helper.ajax({
      url: '/member/delivery/list/get',
      data: {
        page: 0,
        limit: 0
      },
      success: function(data) {
        self.setState({
          list: data
        })
      },
      complete: function() {

      }
    })
  }

  onClickListItem(id) {
    this.props.router.push({
      pathname: '/delivery/edit/' + id,
      query: {

      }
    })
  }

  onClickAdd() {
    this.props.router.push({
      pathname: '/delivery/add',
      query: {

      }
    })
  }

  onClickLeft() {
    this.props.router.goBack()
  }

  render() {
    return (
      <div>
        <div className="header">
          <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)} rightContent={[<div key="0" onClick={this.onClickAdd.bind(this)}>新增</div>]}>收货地址</NavBar>
        </div>
        <div className="container">
          <List>
            {
              this.state.list.map(function (item, index) {
                return (
                  <List.Item key={index} arrow="horizontal" onClick={this.onClickListItem.bind(this, item.member_delivery_id)}>
                    <div style={{marginTop: '20px', height: '50px'}}><span style={{color: '#777777'}}>收货人:</span> {item.member_delivery_name}</div>
                    <div style={{height: '50px'}}><span style={{color: '#777777'}}>联系电话:</span> {item.member_delivery_phone}</div>
                    <div style={{marginBottom: '20px'}}><span style={{color: '#777777'}}>收货地址:</span> {item.member_delivery_province + item.member_delivery_city + item.member_delivery_area + item.member_delivery_address}</div>
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

export default withRouter(Delivery)