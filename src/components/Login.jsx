import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Form } from 'antd'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'
import Flex from 'antd-mobile/lib/flex'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'
import 'antd-mobile/lib/flex/style/index.css'

class Login extends Component {

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
        url: '/member/login',
        data: values,
        success: function(data) {
          Helper.login(data.token, data.student_name)

          self.props.router.push({
            pathname: '/product',
            query: {

            }
          })
        },
        complete: function() {

        }
      })
    })
  }

  onClickRegister() {
    this.props.router.push({
      pathname: '/register',
      query: {

      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <NavBar mode="light" iconName={false}>会员登录</NavBar>
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
          </List.Body>
        </List>
        <div style={{ margin: '100px 20px 0px 20px'}}>
          <Button type="primary" onClick={this.onClickSubmit.bind(this)}>确定</Button>
        </div>
        <div style={{ margin: '20px 20px 0px 20px'}}>
          <Flex>
            <Flex.Item>
              <Button type="default" onClick={this.onClickRegister.bind(this)}>注册</Button>
            </Flex.Item>
            <Flex.Item>
              <Button type="default" onClick={this.onClickRegister.bind(this)}>忘记密码</Button>
            </Flex.Item>
          </Flex>
        </div>
      </div>
    )
  }
}

Login = Form.create({

})(Login)

export default withRouter(Login)