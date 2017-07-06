import 'whatwg-fetch';

var mockDebug = true; //挡板模式   在打包测试发送给客户端的时候，改为false
var localMock = true; //本地挡板
//放入全局变量，设置标题栏时用到
window.mockDebug=mockDebug;
//统一日志
window.log=function(text){
  if(mockDebug) {
    console.log(text);
  }else{
    window.CUBE.log(text);
  }
};
var server = {
  postFormRequest: function (param, callback) {
    window.log("请求参数:");
    window.log(param);
    if (mockDebug) {
      if(localMock){
        server._ajax("/"+param.url,param,callback);
      }else {
        let _param = Object.assign(param,{"request":{"header":{"transId":param.transId}}});
        server._ajax("/public.json",_param, callback);
      }
    } else {
      // 拼接请求 url 完整路径
      let url=param.url;
      delete param.url;
      var _param ={url:url,body:param,onSuccess:'nativeSuccess',onFailure:'nativeFail'};
      window.CUBE.postFormRequest(_param);
      window.nativeSuccess = function (res) {
        window.log('请求成功');
        window.log(res);
        let data = '';
        if(typeof(res) != 'string'){
          //IOS
          data = res;
          window.log('res' + res);
          if (typeof data == 'string') {
            data = JSON.parse(data);
          }

        } else{
          window.log('res' +res);
          //Android
          data = res;
          data=eval('('+data+')');
          window.log('数据长度' + data.resultInfo.length)
        }
        window.log('请求成功111');
        window.log(data);
        window.log(typeof data);
        // 成功请求回调
        callback(true, data);
      };
      window.nativeFail=function(res){
        window.log("返回异常:");
        window.CUBE.showAlert(res);
      }
    }
  },

  //
  _ajax: function (url,param, callback) {
    console.log(url,param);
    fetch(url, {
      method: 'POST',
      headers: {
        "Accept":"application/json",
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body:JSON.stringify(param)
    }).then(function (res) {
      if (res.ok) {
        res.json().then(function (json) {
          window.log("返回数据:");
          window.log(json);
          callback(true, json);
        });
      } else {
        window.log("返回错误:");
        window.log(res);
      }
    }).catch(function (error) {
      window.log("返回抛出异常:");
      window.log(error);
    });
  },
};

export {server as RequestSever};
