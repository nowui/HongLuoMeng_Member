import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Icon from 'antd-mobile/lib/icon'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'
import TabBar from 'antd-mobile/lib/tab-bar'
import SegmentedControl from 'antd-mobile/lib/segmented-control'
import Tabs from 'antd-mobile/lib/tabs'

import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'
import 'antd-mobile/lib/tab-bar/style/index.css'
import 'antd-mobile/lib/segmented-control/style/index.css'
import 'antd-mobile/lib/tabs/style/index.css'

class Brand extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'productTab',
      categoryList: [{
        category_id: '',
        category_name: '全部'
      }],
      productList: []
    }
  }

  componentDidMount() {
    this.loadCategory()

    this.loadBrand('')
  }

  loadCategory = function() {
    let self = this

    Helper.ajax({
      url: '/product/category/list/get',
      data: {

      },
      unLoad: true,
      success: function(data) {
        self.setState({
          categoryList: self.state.categoryList.concat(data)
        })
      },
      complete: function() {

      }
    })
  }

  loadBrand = function(category_id) {
    let self = this

    Helper.ajax({
      url: '/product/list/get',
      data: {
        page: 0,
        limit: 0,
        category_id: category_id
      },
      unLoad: true,
      success: function(data) {
        self.setState({
          productList: data
        })
      },
      complete: function() {

      }
    })
  }

  loadMy = function(category_id) {
    let self = this

    Helper.ajax({
      url: '/product/my/list/get',
      data: {
        page: 0,
        limit: 0,
        category_id: category_id
      },
      unLoad: true,
      success: function(data) {
        self.setState({
          productList: data
        })
      },
      complete: function() {

      }
    })
  }

  onTabsChange(category_id) {
    this.loadBrand(category_id)
  }

  onClickListItem(product_id) {
    this.props.router.push({
      pathname: '/product/index/' + product_id,
      query: {

      }
    })
  }

  onClickCart() {
    this.props.router.push({
      pathname: '/cart',
      query: {

      }
    })
  }

  onValueChange(value) {
    if(value == '我的品牌') {
      this.loadMy('')
    }
  }

  render() {
    const TabPane = Tabs.TabPane

    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          icon={{ uri: require('../assets/image/product.png') }}
          selectedIcon={{ uri: require('../assets/image/product_active.png') }}
          title="产品"
          key="产品"
          selected={this.state.selectedTab === 'productTab'}
          onPress={() => {

          }}
        >
          <div className="header">
            <NavBar mode="light" iconName={false} rightContent={[<div key="0" onClick={this.onClickCart.bind(this)}>购物车</div>]}>产品列表</NavBar>
          </div>
          <div className="container" style={{marginTop: '20px'}}>

            <Tabs defaultActiveKey="" animated={false} onChange={this.onTabsChange.bind(this)}>
              {
                this.state.categoryList.map(function (category, categoryIndex) {
                  return (
                    <TabPane tab={category.category_name} key={category.category_id}>

                    </TabPane>
                  )
                }.bind(this))
              }
            </Tabs>
            <List>
              <List.Body>
                {
                  this.state.productList.map(function (product, productIndex) {
                    return (
                      <List.Item key={product.product_id} arrow="horizontal" onClick={this.onClickListItem.bind(this, product.product_id)}>
                        <div style={{ display: '-webkit-box', display: 'flex' }}>
                          <img style={{ width: 64, marginRight: 8 }} src={Helper.host + product.product_image} />
                          <div style={{ display: 'inline-block' }}>
                            <p>{product.product_name}</p>
                          </div>
                          {
                            product.product_is_apply ?
                              product.product_is_review ?
                              <div style={{position: 'absolute', right: '78px', top: '30px', color: '#888'}}>已签约</div>
                              :
                              <div style={{position: 'absolute', right: '78px', top: '30px', color: '#888'}}>待审核</div>
                            :
                            ''
                          }
                        </div>
                      </List.Item>
                    )
                  }.bind(this))
                }
              </List.Body>
            </List>
          </div>
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
            this.props.router.push({
              pathname: '/mine',
              query: {

              }
            })
          }}
        >
        </TabBar.Item>
      </TabBar>
    )
  }
}

export default withRouter(Brand)