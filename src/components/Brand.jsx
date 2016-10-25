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
      selectedTab: 'brandTab',
      categoryList: [{
        category_id: '',
        category_name: '全部'
      }],
      brandList: []
    }
  }

  componentDidMount() {
    this.loadCategory()

    this.loadBrand('')
  }

  loadCategory = function() {
    let self = this

    Helper.ajax({
      url: '/brand/category/list/get',
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
      url: '/brand/list/get',
      data: {
        page: 0,
        limit: 0,
        category_id: category_id
      },
      unLoad: true,
      success: function(data) {
        self.setState({
          brandList: data
        })
      },
      complete: function() {

      }
    })
  }

  loadMy = function(category_id) {
    let self = this

    Helper.ajax({
      url: '/brand/my/list/get',
      data: {
        page: 0,
        limit: 0,
        category_id: category_id
      },
      unLoad: true,
      success: function(data) {
        self.setState({
          brandList: data
        })
      },
      complete: function() {

      }
    })
  }

  onTabsChange(category_id) {
    this.loadBrand(category_id)
  }

  onClickListItem(brand_id) {
    this.props.router.push({
      pathname: '/brand/index/' + brand_id,
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
          title="商品"
          key="商品"
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

          }}
        >
          <div className="header">
            <SegmentedControl style={{marginTop: '20px'}}
              values={['品牌库', '我的品牌']}
              onValueChange={this.onValueChange.bind(this)}
            />
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
                  this.state.brandList.map(function (brand, brandIndex) {
                    return (
                      <List.Item key={brand.brand_id} arrow="horizontal" onClick={this.onClickListItem.bind(this, brand.brand_id)}>
                        <div style={{ display: '-webkit-box', display: 'flex' }}>
                          <img style={{ width: 64, marginRight: 8 }} src={Helper.host + brand.brand_logo} />
                          <div style={{ display: 'inline-block' }}>
                            <p>{brand.brand_name}</p>
                          </div>
                          {
                            brand.brand_is_apply ?
                              brand.brand_is_review ?
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