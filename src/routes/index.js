import React, { PropTypes } from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
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
import Helper from '../common/Helper'

const validate = function (next, replace, callback) {
    if (!Helper.getToken() && next.location.pathname != '/login') {
        replace('/login')
    }
    callback()
}

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" onEnter={validate}>
    	<IndexRedirect to="product" />
      <Route path="brand" component={Brand}></Route>
      <Route path="brand/index/:brand_id" component={BrandIndex}></Route>
      <Route path="product" component={Product}></Route>
      <Route path="product/index/:product_id" component={ProductIndex}></Route>
      <Route path="mine" component={Mine}></Route>
      <Route path="cart" component={Cart}></Route>
      <Route path="delivery/index" component={DeliveryIndex}></Route>
      <Route path="delivery/add" component={DeliveryDetail}></Route>
      <Route path="delivery/edit/:member_delivery_id" component={DeliveryDetail}></Route>
      <Route path="order/index" component={OrderIndex}></Route>
      <Route path="order/add" component={OrderDetail}></Route>
      <Route path="order/edit/:order_id" component={OrderDetail}></Route>
      <Route path="login" component={Login}></Route>
      <Route path="register" component={Register}></Route>
	    <Route path="*" component={NotFound}></Route>
    </Route>
  </Router>

Routes.propTypes = {
  history: PropTypes.any,
}

export default Routes
