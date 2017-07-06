import React,{PureComponent} from 'react';

import './index.less';

export default class Footer extends PureComponent{
  render () {
    return (
      <footer>
        <div className="page">
          <img src="static/img/page.png" alt=""/>
          <span>首页</span>
          <span className="line"></span>
        </div>
        <div className="mine">
          <img src="static/img/mine.png" alt=""/>
          <span>我的</span>
        </div>
      </footer>
    )
  }
}
