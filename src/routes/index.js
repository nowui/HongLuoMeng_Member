import React, {PropTypes} from 'react'
import {Router, Route, IndexRedirect} from 'react-router'
import NotFound from '../components/NotFound'
import Login from '../components/Login'
import Register from '../components/Register'
import Brand from '../components/Brand'
import BrandIndex from '../components/brand/Index'
import Product from '../components/Product'
import ProductIndex from '../components/product/Index'
import Mine from '../components/Mine'
import Cart from '../components/Cart'
import DeliveryIndex from '../components/delivery/Index'
import DeliveryDetail from '../components/delivery/Detail'
import OrderIndex from '../components/order/Index'
import OrderDetail from '../components/order/Detail'
import TopicIndex from '../components/topic/Index'
import TopicDetail from '../components/topic/Detail'
import Helper from '../common/Helper'

const validate = function (next, replace, callback) {
    if (!Helper.getToken() && next.location.pathname != '/login') {
        replace('/login')
    }
    callback()
}

const Routes = ({history}) =>
    <Router history={history}>
        <Route path="/" onEnter={validate}>
            <IndexRedirect to="product"/>
            <Route path="brand" component={Brand}/>
            <Route path="brand/index/:brand_id" component={BrandIndex}/>
            <Route path="product" component={Product}/>
            <Route path="product/index/:product_id" component={ProductIndex}/>
            <Route path="mine" component={Mine}/>
            <Route path="cart" component={Cart}/>
            <Route path="delivery/index" component={DeliveryIndex}/>
            <Route path="delivery/add" component={DeliveryDetail}/>
            <Route path="delivery/edit/:member_delivery_id" component={DeliveryDetail}/>
            <Route path="order/index" component={OrderIndex}/>
            <Route path="order/add" component={OrderDetail}/>
            <Route path="order/edit/:order_id" component={OrderDetail}/>
            <Route path="topic/index" component={TopicIndex}/>
            <Route path="topic/add" component={TopicDetail}/>
            <Route path="topic/edit/:topic_id" component={TopicDetail}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>

Routes.propTypes = {
    history: PropTypes.any,
}

export default Routes
