import React, { Component } from 'react'
import { withRouter } from 'react-router'

import Result from 'antd-mobile/lib/result'

import 'antd-mobile/lib/result/style/index.css'

class NotFound extends Component {

  handleSubmit() {
    window.history.back()
  }

  render() {
	  return (
	    <Result
	      imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png"
	      title="内容为空"
	      brief="可各业务自定义文案"
	      buttonTxt="返回上一页"
	      buttonClick={this.handleSubmit.bind(this)}
	    />
	  )
  }
}

export default withRouter(NotFound)
