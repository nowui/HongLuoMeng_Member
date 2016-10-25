import reqwest from 'reqwest'
import Toast from 'antd-mobile/lib/toast'

import 'antd-mobile/lib/toast/style/index.css'

const Helper = {
	//host: 'http://localhost:8080',
  host: 'http://api.hongluomeng.nowui.com',
  inputWidth: 390,
  formItemLayout: {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 }
  },
	limit: 15,
  duration: 1.5,
  message: '提示',
  description: '操作成功',
  token: 'token',
  name: 'name',
  required: '不能为空',
  delete: '删除后将无法恢复，您确定要删除吗？',
  notificationSuccess: function() {
    //message.success(this.description, this.duration)
  },
	ajax: function(config) {
    if(! config.unLoad) {
      Toast.loading('加载中...', 0)
    }

    let self = this

    reqwest({
      url: this.host + config.url,
      type: 'json',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.getToken(),
        'platform': 'web',
        'version': '1.0.0'
      },
      data: JSON.stringify(config.data),
      success: function (response) {
        if(! config.unLoad) {
          Toast.hide()
        }

        if(response.code == 200) {
          config.success(response.data)
        } else {
          Toast.fail(response.message, self.duration)
        }
      },
      error: function (error) {
        if(! config.unLoad) {
          Toast.hide()
        }

        Toast.fail('网络发生错误', self.duration)
      },
      complete: function (response) {
        config.complete()
      }
    })
	},
  getToken() {
    return localStorage.getItem(this.token)
  },
  getName() {
    return localStorage.getItem(this.name)
  },
  login: function(token, name) {
    localStorage.setItem(this.token, token)

    localStorage.setItem(this.name, name)
  },
  logout: function() {
    localStorage.removeItem(this.token)

    localStorage.removeItem(this.name)
  },
  course_class: [{
    value: '17',
    text: '星期一第七节'
  }, {
    value: '27',
    text: '星期二第七节'
  }, {
    value: '28',
    text: '星期二第八节'
  }, {
    value: '47',
    text: '星期四第七节'
  }, {
    value: '48',
    text: '星期四第八节'
  }, {
    value: '56',
    text: '星期五第六节'
  }]
}

export default Helper