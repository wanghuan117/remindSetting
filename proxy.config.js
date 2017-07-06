var isRemote = false; //是否forward到远程服务器 , false使用mock数据,true则forward到后台服务器

var local = {
  // 提醒种类
  'POST /min/messageReminder/QueryReminderList.do': function (req, res) {
    const data = {
      "resultInfo":
        [
          {"CLASS_NAME":"存款大额变动提醒","CLASS_ID":"002001"},
          {"CLASS_NAME":"存款大额变动提醒(客户经理)","CLASS_ID":"002002"},
          {"CLASS_NAME":"资产大额变动提醒","CLASS_ID":"002003"},
          {"CLASS_NAME":"资产大额变动提醒(客户经理)","CLASS_ID":"002004"}
        ],
      "MSG":"获取数据成功",
      "code":"AAAAAA"
    }
    res.json(data);
  },

  // 阀值获取
  'POST /min/messageReminder/QueryReminderFZ.do': function (req, res) {
    const data = {
      "resultInfo":
        [
          [
            {"PARA_VAL":"10","PARA_NAME":"PARA_EN_1","PARA_UNIT":"万元"},
            {"PARA_VAL":"20","PARA_NAME":"PARA_EN_2","PARA_UNIT":"万元"},
            {"PARA_VAL":"30","PARA_NAME":"PARA_EN_3","PARA_UNIT":"万元"},
            {"PARA_VAL":"40","PARA_NAME":"PARA_EN_4","PARA_UNIT":"万元"}
          ]
        ],
      "MSG":"获取数据成功",
      "code":"AAAAAA"
    };
    res.json(data);
  },

  // 阀值设置
  'POST /min/messageReminder/SetMReminderFZ.do': function (req, res){
    const data = {
      "resultInfo":[
        {"PARA_VAL":"10","EMP_ID":"0000080149","PARA_NAME":"PARA_EN_1","CLASS_ID":"002001","PARA_UNIT":"万元"},
        {"PARA_VAL":"20","EMP_ID":"0000080149","PARA_NAME":"PARA_EN_2","CLASS_ID":"002001","PARA_UNIT":"万元"},
        {"PARA_VAL":"30","EMP_ID":"0000080149","PARA_NAME":"PARA_EN_3","CLASS_ID":"002001","PARA_UNIT":"万元"},
        {"PARA_VAL":"40","EMP_ID":"0000080149","PARA_NAME":"PARA_EN_4","CLASS_ID":"002001","PARA_UNIT":"万元"}
      ]
      ,
      "MSG":"获取数据成功",
      "code":"AAAAAA"
    };
    res.json(data);
  }

};


var localReq = '*public.json'; //页面请求
var forward = 'http://195.216.160.148/CMBC_CUBE_Server'; //转发服务器路径

//个性化配置
var remoteExt = {};

var remote = function () {
  var result = {};
  result[localReq] = forward;
  return Object.assign({}, result, remoteExt);
};

module.exports = isRemote ? remote() : local;
