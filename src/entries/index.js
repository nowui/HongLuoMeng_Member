import './index.html';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import Routes from '../routes/index';
import FastClick from 'fastclick'

FastClick.attach(document.body)

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(<Routes history={appHistory} />, document.getElementById('root'));
