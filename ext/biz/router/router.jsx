import React from 'react';
import {Router,Route,hashHistory,IndexRedirect} from 'react-router';
// 入口
import App from './../container/App/index';

/*分析工具
*  remindSetting - 消息提醒设置主页
*/
import RemindSetting from './../container/App/remindSetting/index';

const AppRouter = () => {
  return (
    <Router history={hashHistory} >
      <Route path="/" component={App}>
        {/*默认重定向那个页面*/}
        <IndexRedirect to="remindSetting"/>

        {/*消息提醒设置*/}
        <Route path="remindSetting" component={RemindSetting}></Route>
        {/*后期*/}
      </Route>{/*App*/}
    </Router>
  );
};

export { AppRouter as default };
