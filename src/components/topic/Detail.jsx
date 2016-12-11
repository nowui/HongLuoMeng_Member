import React, {Component} from 'react'
import {withRouter, Link} from 'react-router'
import {createForm} from 'rc-form'
import Helper from '../../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import Flex from 'antd-mobile/lib/flex'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/flex/style/index.css'

class TopicDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        if (this.props.route.path.indexOf('/edit') > -1) {
            // this.load()
        }
    }

    load = function() {
        let self = this

        Helper.ajax({
            url: '/topic/get',
            data: {
                topic_id: self.props.params.topic_id
            },
            success: function(data) {
                self.props.form.setFieldsValue(data)
            },
            complete: function() {

            }
        })
    }

    onClickLeft() {
        this.props.router.goBack()
    }

    onClicKLike() {
        let self = this

        Helper.ajax({
            url: '/topic/like/save',
            data: {
                topic_id: self.props.params.topic_id
            },
            success: function (data) {

            },
            complete: function () {

            }
        })
    }

    onClickComment() {
        let self = this

        Helper.ajax({
            url: '/topic/comment/save',
            data: {
                topic_id: self.props.params.topic_id,
                topic_comment_reply_to_member_id: '',
                topic_comment_text: '123456'
            },
            success: function (data) {

            },
            complete: function () {

            }
        })
    }

    onClickSubmit() {
        let self = this

        self.props.form.validateFields((errors, values) => {
            let type = self.props.route.path.indexOf('/edit') > -1 ? 'update' : 'save'

            Helper.ajax({
                url: '/topic/' + type,
                data: values,
                success: function (data) {
                    self.props.router.goBack()
                },
                complete: function () {

                }
            })
        })
    }

    render() {
        const {getFieldProps} = this.props.form

        return (
            <div>
                <div className="header">
                    <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)}>红圈</NavBar>
                </div>
                <div className="container">
                    <List>
                        <InputItem {...getFieldProps('topic_text', {
                            initialValue: ''
                        })}
                                   clear
                                   placeholder="请输入文字"
                        >
                            文字
                        </InputItem>
                    </List>
                    <div style={{margin: '100px 20px 0px 20px'}}>
                        <Button type="primary" onClick={this.onClickSubmit.bind(this)}>确定</Button>
                    </div>
                    <div style={{
                        margin: '20px 20px 0px 20px'
                    }}>
                        <Flex>
                            <Flex.Item>
                                <Button type="default" onClick={this.onClicKLike.bind(this)}>点赞</Button>
                            </Flex.Item>
                            <Flex.Item>
                                <Button type="default" onClick={this.onClickComment.bind(this)}>评论</Button>
                            </Flex.Item>
                        </Flex>
                    </div>
                </div>
            </div>
        )
    }
}

TopicDetail = createForm({})(TopicDetail)

export default withRouter(TopicDetail)