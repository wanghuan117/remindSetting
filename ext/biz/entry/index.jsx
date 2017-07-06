import React from 'react';
import ReactDOM from 'react-dom';
import Router from './../router/router';

import './index.less';

setTimeout(function () {
  ReactDOM.render((
    <Router />
  ), document.getElementById('app'));
},30);
