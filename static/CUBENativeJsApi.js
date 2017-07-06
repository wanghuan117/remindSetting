(function () {

  function android() {
    (function() {
      var cmbc = {};
      window.cmbc = cmbc;
      /*命名空间*/
      if (typeof CUBE == 'undefined') {
        CUBE = function() { }
      }
      cmbc.init = function() {
        var param = {
          "success": "initCallback"
        };
        cmbc.callClientForComm("getClientInfo", param);
      };
      var callClient = function(action, param, className) {
        var funcStr = "window." + className + "." + action + "('" + JSON.stringify(param) + "')";
        eval(funcStr);
      };
      cmbc.callClientForUI = function(action, param) {
        var className = "InteractJsForUI";
        callClient(action, param, className);
      };
      cmbc.callClientForComm = function(action, param) {
        var className = "InteractJsForComm";
        callClient(action, param, className);
      };
      cmbc.callClientForBank = function(action, param) {
        var className = "InteractJsForBank";
        callClient(action, param, className);
      };
      cmbc.callClientForWeb= function(action,param){
        var className="NativePlugin";
        callClient(action,param,className);
      };
      cmbc.callback = function(msg) {
        return msg;
      };
    })();

    //弹出对话框
    CUBE.showAlert=function(param){
      var jsonTest= {
        MSG : param
      };
      jsonTest=JSON.stringify(jsonTest);
      cmbc.callClientForComm("showAlert",jsonTest);
    };
    //发送网络请求
    CUBE.postFormRequest=function(param){
      cmbc.callClientForComm("sendRequest",param);
    };
    //设置标题栏
    CUBE.setTitle=function(param){
      window.titleLeftCallBack=function(){
        param.leftTap && param.leftTap();
      };
      window.titleRightCallBack=function(){
        param.rightTap && param.rightTap();
      };
      var appTitle={
        title:param.title,
        leftCallback:"titleLeftCallBack",
        isShowCloseBtn:"false",
        rightBtnImgCallback:"titleRightCallBack"
      };
      //param.rightIcon
      param.rightIcon ? (appTitle.rightBtnImgName=param.rightIcon+".png"):null;
      cmbc.callClientForComm("setTitle",appTitle);
    };
    //获取用户名
    CUBE.getUserName=function(param){
      cmbc.callClientForComm("getUserName",param);
    };
    //获取位置信息
    CUBE.getLocation=function(param){
      cmbc.callClientForComm("getLocation",param);
    };
    //等待层状态  0表示不显示，1表示显示
    CUBE.setWaitPanel=function(param){
      cmbc.callClientForUI("setWaitPanel",param);
    };
    //日志
    CUBE.log=function(param){
      cmbc.callClientForComm("log",param);
    };
    //显示导航栏 隐藏导航栏
    CUBE.showTitleBar=function(param){
      cmbc.callClientForComm("titleHide",param);
    };
    //调用native页面
    CUBE.callNativePage=function(param){
      cmbc.callClientForWeb("callNativePage",param);
    };
    //分享
    CUBE.shareWeb=function(param){
      cmbc.callClientForComm("toShare",param);
    };
    //关闭当前浏览器
    CUBE.close=function(){
      cmbc.callClientForComm("close");
    };
    //webView返回事件
    CUBE.quitWebViewPage=function(param){
      cmbc.callClientForComm("goBack",param);
    };
    //刷新webView页面
    CUBE.showRefreshButton=function(param){
      cmbc.callClientForComm("refresh",param);
    };

    //选择照片
    CUBE.selectPhoto=function(param){
      cmbc.callClientForComm("selectPhoto",param);
    };


    //获取name id
    // CUBE.getNameFromNative=function(param){
    //   cmbc.callClientForComm("getMessageSetting",param);
    // };

  }



  function ios() {
    (function () {
      var isIos = true;
      if (isIos) {
        var x5 = {
          commandQueue:[],//数组
          commandQueueFlushing:false,
          resources:
          {
            base: !0
          }
        };

        window.x5 = x5;

        x5.callbackId = 0;
        x5.callbacks = {};
        x5.callbackStatus = {
          NO_RESULT:0,
          OK:1,
          CLASS_NOT_FOUND_EXCEPTION:2,
          ILLEGAL_ACCESS_EXCEPTION:3,
          INSTANTIATION_EXCEPTION:4,
          MALFORMED_URL_EXCEPTION:5,
          IO_EXCEPTION:6,
          INVALID_ACTION:7,
          JSON_EXCEPTION:8,
          ERROR:9
        };

        x5.createBridge = function () {
          var bridge = document.createElement("iframe");
          bridge.setAttribute("style", "display:none;");
          bridge.setAttribute("height", "0px");
          bridge.setAttribute("width", "0px");
          bridge.setAttribute("frameborder", "0");
          document.documentElement.appendChild(bridge);
          return bridge;
        };

        x5.exec = function (service, action, options) {
          var command =
          {
            className:service,
            methodName:action,
            options:{}
          };

          for (var i = 0; i < options.length; ++i) {
            var arg = options[i];

            if (arg == undefined || arg == null) {
              //continue;
            }
            else if (typeof(arg) == 'object') {
              command.options = arg;
            }
          }

          x5.commandQueue.push(JSON.stringify(command));

          if (x5.commandQueue.length == 1 && !x5.commandQueueFlushing) {
            if (!x5.bridge) {
              x5.bridge = x5.createBridge();
            }
            x5.bridge.src = "mszx:" + service + ":" + action;
          }

        };

        // 浏览器调用接口
        x5.getAndClearQueuedCommands = function () {
          var json = JSON.stringify(x5.commandQueue);
          x5.commandQueue = [];
          return json;
        };

      }

    })();
    /*命名空间*/
    if (typeof CUBE == 'undefined') {
      CUBE = function() { }
    }

    // ***************************************
    // functions
    // ***************************************
    //网络请求
    CUBE.postFormRequest = function(jsDict) {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"sendRequest", "2":jsDict}]);
    };
    //设置导航栏
    CUBE.setTitle = function(param) {
      window.titleLeftCallBack=function(){
        param.leftTap && param.leftTap();
      };
      window.titleRightCallBack=function(){
        param.rightTap && param.rightTap();
      };
      var appTitle={
        title:param.title,
        leftCallback:"titleLeftCallBack",
        isShowCloseBtn:"false",
        rightBtnImgCallback:"titleRightCallBack"
      };
      //param.rightIcon
      param.rightIcon ? (appTitle.rightBtnImgName="push"+".png"):null;

      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"setTitle",
        "2":appTitle
      }]);
    };
    //弹提示框
    CUBE.showAlert = function(msg) {
      var jsonTest= {
        MSG : msg
      };
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"showAlert", "2":jsonTest}]);
    };

    //获取client信息
    CUBE.getClientInfo = function(jsDict) {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"getClientInfo", "2":jsDict}]);
    };
    //log 日志
    CUBE.log = function (param) {
      var jsonParam = {
        body: {
          info: param
        }
      };
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"log", "2":jsonParam}]);
    };


    //获取name和class_Id
    CUBE.getNameFromNative = function (param) {
      var jsonParam = {
        onSuccess: param
      };
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"getMessageSetting", "2":jsonParam}]);
    };




    //x5.exec(argu1, argu2, argu3, argu4, argu5)

    // argu1:业务ID,和客户端在JSCenter中注册的保持一致
    // argu2:指定客户端的执行函数名称,下划线"_"表示一个":",必须以"_"结尾,例如"A_B_",对应客户端的函数为 -(returnType)A:B:,
    //       参数由argu5指定,返回类型由客户端的具体实现决定
    // argu3:参数列表,jason格式固定为数组包含一个字典, 字典的key数目,必须和执行函数的下划线"_"个数一致

    // 具体的业务接口实现demo
   /* function play()
    {
      x5.exec("testid", "testJS_Array_Dict_", [{"1":"string1", "2":["array1", "array2"], "3":{"key1":"value1", "key2":"value2"}}]);
    }*/

    // 回调的demo函数,参数未客户端函数执行的返回值
    /*function testcallback(value)
    {
      alert(value);
    }*/

    // Firefly平台内置的公共接口函数 executeJSCode_JSDict_
    // 参数为一个字典，包括两个key值
    // 第一个key值统一为code码（string），对应客户端具体的函数名称
    // 第二个key值为传给函数的参数字典（dictionary）

    //调安保键盘
    function showPassGuard()
    {
      var x=document.getElementById("password");
      x.value = "";
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"showPassGuard",
        "2":{"id":"Password","text":"","isnum":"1","randomNumber":"PUkKHi","max":"20","min":"6","errorMsg":"密码支持6-20位的数字加英文字母，大小写敏感，不允许设置纯数字、相同字母等过于简单的密码 ！","nullMsg":"登录密码,不能为空","callback":"keyboardCallback","state":"30818702818100B9800F6965ECCDD3621E2DF1974FEDF8B8BFCD5ECF58155DCB279CAA8F8838480B6DFC973752CC678C2A291A799927C08CCD7CB31218DB8B3A5A675C4E83B997F7D0479C3692DD53D52B52C61ECEE4708B1C0F2199001DD298A52BBF5750EDED9F03CA05B19E295D84CFB1798E084458E972A506F6629C4B22509713B9C72F5F020103","signature":"D244E8214F4EF70CEB26DBD3AE387B5F6EFCBC3396007476E44A0B3A26705B1285A7716A4C05205E3CD0D3B992B3528026E7DEE7FC1850D2957311A00937248EF48EBA9E42896A3A1ED47BC1901F4F8917D2023C28F888C442EFCE242FB0936B0549B3FC83F2A381FADCC430C8AEE7E50F70A0580B745DBBB75FA099C301B02D"}
      }]);
    }

    /**
     * 安保键盘回调函数
     * @param result
     * 加密后的密文 result|md5|length|xxx
     * 新版安保键盘不支持md5
     */
    /*function keyboardCallback(result)
    {
      var tmp = result.split("|");
      displayString = "012345678901234567890123456789".substr(0,tmp[2]);

      var x=document.getElementById("password");
      x.value = displayString;

      var password  = tmp[0];
      var jsDict = {"title":"密码",
        "msg":password,
        "cancel_text":"取消",
        "cancel":"testcallback",
        "success_text":"确定",
        "success":"testcallback"
      };

      setAlertInfo(jsDict);
    }*/
    // 返回
    function goBack()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"goBack", "2":""}]);
    }

    // 后退
    /*function webviewBack()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"webBack", "2":""}]);
    }*/

    // 刷新页面
    function refreshWebview()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"refreshWebview", "2":""}]);
    }

    // 是否支持NFC
    function isSupportNFC()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"isSupportNFC", "2":{"success":"testcallback"}}]);
    }

    // 是否支持指纹验证
    function isSupportFingerprintVerify()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"isSupportFingerprintVerify", "2":{"success":""}}]);
    }

    // aes加密
   /* function aesEncryptData()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"encryptData",
        "2":{"type":"aes",
          "msg":"firefly萤火虫",
          "success":"testcallback"
        }
      }]);
    }*/

    // aes解密
   /* function aesDecryptData()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"decryptData",
        "2":{"type":"aes",
          "msg":"HJ3O4U4VZlvLx8Agdzi7GdJtrQ4OYyHJ/Kq4YhBdVpo=",
          "success":"testcallback"
        }
      }]);
    }*/

    // ras加密
   /* function rsaEncryptData()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"encryptData",
        "2":{"type":"rsa",
          "msg":"firefly萤火虫",
          "success":"testcallback"
        }
      }]);
    }*/
    // 扫描二维码
    function scanQRCode()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"scanQRCode", "2":{"success":"showqrresult"}}]);
    }

    function testWebview()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"testWebview",
        "2":{"type":"rsa",
          "msg":"firefly萤火虫",
          "success":"testcallback"
        }
      }]);

    }


    CUBE.openCamera = function(jsDict) {

      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"openCamera", "2":jsDict}]);
    };


    //3, 显示导航栏
    CUBE.showNavgationBar = function(jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"showNavgationBar",
        "2":jsDict
      }]);
    };

    // 4,隐藏导航栏
    CUBE.hideNavgationBar = function(jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"showNavgationBar",
        "2":jsDict
      }]);
    };
    //5,调用native页面
    CUBE.callNativePage = function(jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"callNativePage",
        "2":jsDict
      }]);
    };


    // 7,分享
    CUBE.shareWeb = function(jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"shareWeb", "2":jsDict}]);
    };
    // 8,显示当前页面刷新按钮
    CUBE.showRefreshButton = function(jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"showRefreshButton", "2":jsDict}]);
    };
    //9, 显示退出导航页的按钮
    CUBE.showBackButton = function(jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"showBackButton", "2":jsDict}]);
    };

    // 10显示当前页面后退的按钮
    CUBE.showWebviewBackButton = function(jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"showWebviewBackButton", "2":jsDict}]);
    };



    //12, 获取lbs信息
    CUBE.getLocation = function(jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"getLocation", "2":jsDict}]);
    };

    //13, 显示或取消等待层 “0”:取消 "1":显示
    CUBE.setWaitPanel = function ()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"setWaitPanel", "2":{"Status":"1"}}]);
    };
    //14, 获得用户的机构id
    CUBE.getUserName  = function (jsDict)
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"getUserName", "2":jsDict}]);
    };
    // 15，退出web页面
    CUBE.close = function ()
    {
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"quitWebViewPage", "2":""}]);
    };

  }

  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isAndroid){
    android();
  }else if(isiOS){
    ios();
  }else{
    alert('error');
  }
}());
