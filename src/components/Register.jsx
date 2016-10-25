import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Form } from 'antd'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user_phone: '15900672218',
      user_password: '123456'
    }
  }

  componentDidMount() {
    this.props.form.setFieldsValue(this.state)
  }

  onClickSubmit() {
    let self = this

    self.props.form.validateFields((errors, values) => {
      if (!!errors) {
        let message = ''

        for(let e in errors) {
          message += errors[e]['errors'][0]['message'] + ';'
        }

        Toast.fail(message, Helper.duration)

        return
      }

      if(values.user_phone == '') {
        Toast.fail('帐号为空', Helper.duration)

        return
      }

      if(values.user_password == '') {
        Toast.fail('密码为空', Helper.duration)

        return
      }

      Helper.ajax({
        url: '/member/register',
        data: values,
        success: function(data) {
          Helper.login(data.token, data.student_name)

          self.props.router.push({
            pathname: '/index',
            query: {

            }
          })
        },
        complete: function() {

        }
      })
    })
  }

  onClickSms() {
    Helper.ajax({
      url: '/sms/register',
      data: {
        sms_phone: '15900672218'
      },
      success: function(data) {

      },
      complete: function() {

      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <NavBar mode="light" iconName={false}>会员注册</NavBar>
        <List style={{ margin: '100px 20px 0px 20px'}}>
          <List.Body>
            <InputItem {...getFieldProps('user_phone', {
                initialValue: ''
              })}
              clear
              placeholder="请输入帐号"
              >帐号</InputItem>
            <InputItem
              {...getFieldProps('user_password', {
                initialValue: ''
              })}
              type="password"
              format="password"
              clear
              placeholder="请输入密码"
            >密码</InputItem>
            <InputItem
              {...getFieldProps('sms_code', {
                initialValue: ''
              })}
              clear
              placeholder="请输入验证码"
            >验证码</InputItem>
          </List.Body>
        </List>
        <div style={{ margin: '100px 20px 0px 20px'}}>
          <Button type="primary" onClick={this.onClickSubmit.bind(this)}>确定</Button>
        </div>
        <div style={{ margin: '100px 20px 0px 20px'}}>
          <Button type="primary" onClick={this.onClickSms.bind(this)}>发送验证码</Button>
        </div>
      </div>
    )
  }
}

Register = Form.create({

})(Register)

export default withRouter(Register)