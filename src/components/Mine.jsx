import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Button from 'antd-mobile/lib/button'
import Icon from 'antd-mobile/lib/icon'
import TabBar from 'antd-mobile/lib/tab-bar'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/tab-bar/style/index.css'

class Mine extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'mineTab'
    }
  }

  componentDidMount() {

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
      pathname: '/delivery/index',
      query: {

      }
    })
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          icon={{ uri: require('../assets/image/product.png') }}
          selectedIcon={{ uri: require('../assets/image/product_active.png') }}
          title="课程"
          key="课程"
          selected={this.state.selectedTab === 'productTab'}
          onPress={() => {
            this.props.router.push({
              pathname: '/product',
              query: {

              }
            })
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: require('../assets/image/brand.png') }}
          selectedIcon={{ uri: require('../assets/image/brand_active.png') }}
          title="品牌"
          key="品牌"
          selected={this.state.selectedTab === 'brandTab'}
          onPress={() => {
            this.props.router.push({
              pathname: '/brand',
              query: {

              }
            })
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: require('../assets/image/mine.png') }}
          selectedIcon={{ uri: require('../assets/image/mine_active.png') }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'mineTab'}
          onPress={() => {
          }}
        >
          <div className="header">
            <NavBar mode="light" iconName={false}>个人中心</NavBar>
          </div>

          <div className="container">
            <List style={{ marginTop: '40px' }}>
              <List.Body>
                <List.Item arrow="horizontal" onClick={this.onClickListItem.bind(this, '')}>
                  我的品牌
                </List.Item>
                <List.Item arrow="horizontal" onClick={this.onClickListItem.bind(this, '')}>
                  我的订单
                </List.Item>
                <List.Item arrow="horizontal" onClick={this.onClickListItem.bind(this, '')}>
                  收货地址
                </List.Item>
              </List.Body>
            </List>

            <div style={{ margin: '100px 20px 0px 20px'}}>
              <Button onClick={this.onClickLogout.bind(this)} style={{backgroundColor: '#dd514c', color: '#ffffff'}}>退出</Button>
            </div>
          </div>
        </TabBar.Item>
      </TabBar>
    )
  }
}

export default withRouter(Mine)