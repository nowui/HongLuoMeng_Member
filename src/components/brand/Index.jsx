import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import { createForm } from 'rc-form'
import Helper from '../../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Icon from 'antd-mobile/lib/icon'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'
import InputItem from 'antd-mobile/lib/input-item'

import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'
import 'antd-mobile/lib/input-item/style/index.css'

class BrandIndex extends Component {

  constructor(props) {
    super(props)

    this.state = {
      brand: {
        brand_apply_review_status: ''
      }
    }
  }

  componentDidMount() {
    this.load()
  }

  load = function() {
    let self = this

    Helper.ajax({
      url: '/brand/get',
      data: {
        brand_id: self.props.params.brand_id
      },
      unLoad: false,
      success: function(data) {
        self.setState({
          brand: data
        })
      },
      complete: function() {

      }
    })
  }

  onClickLeft() {
    this.props.router.goBack()
  }



  onClickSubmit() {
    let self = this

    self.props.form.validateFields((errors, values) => {
      values.brand_id = self.props.params.brand_id

      Helper.ajax({
        url: '/brand/apply/save',
        data: values,
        success: function(data) {
          let brand = self.state.brand

          self.setState({
            brand: brand
          })

          Toast.success("操作成功", Helper.duration)
        },
        complete: function() {

        }
      })
    })
  }

  onClickCancel() {
    let self = this

    self.props.form.validateFields((errors, values) => {
      values.brand_id = self.props.params.brand_id

      Helper.ajax({
        url: '/brand/apply/cancel',
        data: values,
        success: function(data) {
          let brand = self.state.brand

          self.setState({
            brand: brand
          })

          Toast.success("操作成功", Helper.duration)
        },
        complete: function() {

        }
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <div className="header">
          <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)}>{this.state.brand.brand_name}</NavBar>
        </div>

        <div className="container">
          <List style={{ marginTop: '40px' }}>
            <InputItem {...getFieldProps('member_real_name', {
              initialValue: ''
            })}
            clear
            placeholder="请输入真实姓名"
            >申请人</InputItem>
            <InputItem {...getFieldProps('member_identity_card', {
              initialValue: ''
            })}
            clear
            placeholder="请输入生份证号"
            >生份证号</InputItem>
            <InputItem {...getFieldProps('member_identity_card_front_image', {
              initialValue: ''
            })}
            clear
            placeholder="请输入生份证照片正面"
            >照片正面</InputItem>
            <InputItem {...getFieldProps('member_identity_card_back_image', {
              initialValue: ''
            })}
            clear
            placeholder="请输入生份证照片反面"
            >照片反面</InputItem>
          </List>

          {
            this.state.brand.brand_apply_review_status == 'none' || this.state.brand.brand_apply_review_status == 'refuse' || this.state.brand.brand_apply_review_status == 'cancel' ?
            <div style={{ margin: '100px 20px 0px 20px'}}>
              <Button type="primary" onClick={this.onClickSubmit.bind(this, true)}>签约</Button>
            </div>
            :
            ''
          }

          {
            this.state.brand.brand_apply_review_status == 'waiting' ?
            <div style={{ margin: '100px 20px 0px 20px'}}>
              <Button onClick={this.onClickCancel.bind(this, true)}>取消</Button>
            </div>
            :
            ''
          }
        </div>
      </div>
    )
  }
}

BrandIndex = createForm({

})(BrandIndex)

export default withRouter(BrandIndex)