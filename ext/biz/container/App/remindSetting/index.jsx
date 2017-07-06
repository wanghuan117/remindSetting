import React,{PureComponent} from 'react';
import {RequestSever} from './../../../common/server';
import { Picker, List } from 'antd-mobile';

import './picker.less';
import './index.less';

let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


class RemindSetting extends PureComponent {
  static contextTypes = {
    router: React.PropTypes.any,
    setTitleBar: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      listName: [],  // 调用第一个接口之前的初始化
      arrValue:[],
      cardName:"",    // 默认显示内容
      PARA_VAL: '',
      CLASS_ID: '',    // 每一个人ID
      PARA_UNIT: '万元',
      listInfo: [],      // 调用第二个接口，阀值获取，初始化
      index:0,           // 点击下拉框的相对应的index
      key: '',             // 002大额变动， 005到期提醒
      data:[
        {"label":"存款大额变动提醒","value":"002001"},
        {"label":"存款大额变动提醒","value":"002001"},
        {"label":"存款大额变动提醒","value":"002001"},
        {"label":"存款大额变动提醒","value":"002001"},
        {"label":"存款大额变动提醒","value":"002001"},
        {"label":"存款大额变动提醒","value":"002001"}
      ],
      len:''            // 根据调用客户端的方法，获取classID的长度
    }
  }



  componentWillMount() {
    this._setTitleBar();

    // 调客户端的方法
    window.messageRemSet = this.message; //将调用客户端的成功回调挂在window上

    if(isiOS){ //ios
      CUBE.getNameFromNative("messageRemSet");
    }else{
      // android
      let param = {
        onSuccess: 'messageRemSet'
      };
      window.InteractJsForComm.getMessageSetting(JSON.stringify(param));
    }
  }

  // 根据客户端的方法读取子类ID
  message = (res) => {
    window.log("res"+res);
   // console.log(res)
    if((typeof res) == 'string'){
      res = JSON.parse(res);
    }

    if(JSON.stringify(res) == "{}" || res.classId == undefined || res.classId == ''){ // 空对象

      // 请求下拉列表
      RequestSever.postFormRequest(
        {
          "url": "min/messageReminder/QueryReminderList.do",
          "channelId": '1'
        },
        this.info
      )
    }else{

      let id1;
      let title = res.title;
      window.log('id的长度'+ res.classId.length)
      this.setState({
        len: res.classId.length
      });

      if(res.classId.length > 3){
        id1 = res.classId.slice(0, 3);
      }else{
        id1 = res.classId;
      }
      window.log(typeof res)

      // id1 = '';
      window.log('title' + title)
      window.log('id1'+ id1)

      this.setState({
        cardName:title,
        key: id1
      },() => {
        RequestSever.postFormRequest(
          {
            "url": "min/messageReminder/QueryReminderFZ.do",
            "role": "CUST",
            // 显示默认的第一个CLASS_ID 所在的内容
            "para": res.classId
          },
          // this.initial
          (req,res) => this.initial(req,res, this.state.index)
        )
      })
    }
  }

  // 下拉列表回调
  info = (req, res) => {
    window.log('res转换前' + res)
    window.log(typeof res)
    //console.log(res.resultInfo[0].CLASS_ID.slice(0,3))
    //console.log(res.resultInfo[0].CLASS_ID.slice(0,3) == '002')
    let id2 = res.resultInfo[0].CLASS_ID.slice(0,3);

    this.setState({
      listName: res.resultInfo,
      key: id2,
      data: res.resultInfo.map((item, index) => {
        return (
          {
            "label":item.CLASS_NAME,
            "value": item.CLASS_ID
          }
        )
      }),
      cardName: res.resultInfo[0].CLASS_NAME,
      CLASS_ID: res.resultInfo[0].CLASS_ID
    },()=>{
      //window.log('info回调的CLASS_ID:' + this.state.CLASS_ID)
      // console.log(this.state.listName);
      // console.log(res.resultInfo[0]);
      // window.log(this.state.PARA_UNIT)
      // console.log(this.state.cardName)


      // 查询默认阀值
      RequestSever.postFormRequest(
        {
          "url": "min/messageReminder/QueryReminderFZ.do",
          "role": "CUST",
          // 显示默认的第一个CLASS_ID 所在的内容
          "para": this.state.listName[0].CLASS_ID
        },
        // this.initial
        (req,res) => this.initial(req,res, this.state.index)
      )
    })

  };

// 阀值读取接口回调
  initial = (req, res, index) => {

    let arrValue=["1","0","0","0"];
    ["PARA_EN_1","PARA_EN_2","PARA_EN_3","PARA_EN_4"].map((value,index) => {
      res.resultInfo[0].map((v,i) => {
        if(value == v.PARA_NAME){   // 根据接口给的显示，有对应的PARA_EN_进行对应的显示，没有的默认为0
         arrValue[index] = v.PARA_VAL
        }
      })
    });

    this.setState({
      listInfo: res.resultInfo[0],
      PARA_UNIT: res.resultInfo[0][0].PARA_UNIT, // index是 initial回调带过来的当前显示的索引
      arrValue: arrValue,

    })
    // console.log(this.state.listInfo);
    window.log('p2')
    window.log('this.state.PARA_UNIT' + this.state.PARA_UNIT)
  };

  // 点击弹框中的确定，后的回调
  onChange = (res) => {
    console.log(res); // 当前弹框中显示的data中的 value值
    let data2 = this.state.data;  // 接口返给的数据
    let dataLen = data2.length;

    // 截取出前三位 002或003
    let id = res[0].slice(0,3);

    window.log('-----------------')
    window.log('从我的进'+id)

    this.setState({
      key: id
    })

    window.log('this.state.key' + this.state.key)

    for (var i=0; i<dataLen; i++){
      if (data2[i].value == res[0]){
        console.log( this.state.data[i].label);
        this.setState({
          cardName: this.state.data[i].label,
          index: i,   // 获取的下拉表的数据的索引
          CLASS_ID: res[0]
        }, () => {
          RequestSever.postFormRequest(
            {
              // 在点击下拉框中的每一个元素时，发送请求
              "url": "min/messageReminder/QueryReminderFZ.do",
              "role": "CUST",
              "para": this.state.CLASS_ID
            },
            // this.initial2
            (req,res) => this.initial(req,res,this.state.CLASS_ID, this.state.index)
          )

        })
      }
    }
  }

  //设置导航头
  _setTitleBar =()=> {
// 调客户端的方法
    let Title={
      title:"消息提醒设置"
    };
    if(isiOS){ //ios
      x5.exec("demoid", "executeJSCode_JSDict_", [{"1":"setTitle", "2":Title}]);
    }else{
      // android
      window.InteractJsForComm.setTitle(JSON.stringify(Title));
    }
  };


  // 调用客户端的弹窗方法
  showAlert(msg){
    if(isiOS){
      CUBE.showAlert(msg);
    }else{
      window.InteractJsForComm.setAlertInfo(JSON.stringify({
        "msg": msg,
        "success": ""
      }));
    }
  }

  // 将汉字转换为字母，并且作为参数发给后台
  danWei(msg){
    switch (msg){
      case'万元': return'WY'
      break;

      case'天': return'DAY'
      break;

      case'月': return'MONTH'
      break;
    }
  }
//提交
  submit=()=>{
    //window.log('this.state.key' + this.state.key)
    if(this.state.key == '002') {
      //window.log("进入002")
      let arr = [];
      this.state.listInfo.map((item, index)=>{
        arr[index] = (document.getElementsByTagName("input")[index].value);
        window.log(arr[index]);
      })
      let content = arr[0];
      //window.log('content' + content)
      console.log(content)
      if(content){
        let isN = (/^[0-9]*[1-9][0-9]*$/).test(content);
          if(!isN || content.length > 19){

            this.showAlert('请输入不超过19位的整数');

        }else{
          // window.log('CLASS_ID:' + this.state.CLASS_ID)

            window.log('content' + content);

            window.log('========' +this.state.listInfo[0].PARA_UNIT);
            window.log('this.danWei' + this.danWei(this.state.listInfo[0].PARA_UNIT));



            let paramSend = {
            "url": "min/messageReminder/SetMReminderFZ.do",
            "para1": content,
            "role": "CUST",
            "classId": this.state.CLASS_ID,
            "unit": this.danWei(this.state.listInfo[0].PARA_UNIT)
          }
          RequestSever.postFormRequest(paramSend, this.send);
        }
      }else{
        this.showAlert('输入的内容不能为空');
      }
    }else if(this.state.key == '003'){
      let arr = document.getElementsByTagName("input");

      //window.log(arr.length);
      let arr2 = [];
      arr2[0] =  arr[0].value;
      arr2[1] =  arr[1].value;
      arr2[2] =  arr[2].value;
      arr2[3] =  arr[3].value;

      window.log(arr2[0]+ arr2[1] + arr2[2] +  arr2[3])

      //验证输入的是否为整数

      let isNum1 = (/^[0-9]*[1-9][0-9]*$/).test(arr2[1]);
      let isNum2 = (/^[0-9]*[1-9][0-9]*$/).test(arr2[2]);
      let isNum3 = (/^[0-9]*[1-9][0-9]*$/).test(arr2[3]);

      //console.log(typeof  this.state.PARA_UNIT);

        if(arr2[1] && arr2[2] && arr2[3]){

          if(this.state.PARA_UNIT == '天'){
            if( arr2[3] > 31){
              this.showAlert('第四阀值最大为31');
              return false;
            }

          }else if(this.state.PARA_UNIT == '月'){
            if( arr2[3] > 6){
              this.showAlert('第四阀值最大为6');
              return false;
            }
          }

          if(arr2[0]*1 > arr2[1]*1 || arr2[1]*1 > arr2[2]*1 || arr2[2]*1 > arr2[3]*1){
            this.showAlert('输入的数字不符合条件');
            return false;

          }else if(!isNum1 || !isNum2 || !isNum3){
            this.showAlert('输入大于0的整数');
            return false;
          }else{
            // 向后台发送保存的数据
            RequestSever.postFormRequest(
              {
                "url": "min/messageReminder/SetMReminderFZ.do",
                "para1": arr2[0],
                "para2": arr2[1],
                "para3": arr2[2],
                "para4": arr2[3],
                "role": "CUST",
                "classId": this.state.CLASS_ID,
                "unit": this.danWei(this.state.listInfo[0].PARA_UNIT)
              },
              this.send);
          }
        }else {
          this.showAlert('输入的内容不能为空');

        }
    }
  };

send = (req, res) => {
  this.showAlert('保存成功');

  window.log(res + "保存验证,发送请求成功");
  //console.log("保存验证,发送请求成功")
};

  render() {


    return(
  		<div className="wrapper">
          <Picker
            data={this.state.data}
            cols={1}
            className="forss"
            extra={this.state.cardName}
            onChange={this.state.len == ''?this.onChange:''}
            okText="完成">
            <List.Item arrow="horizontal" style={{display: this.state.len == ''?'':'none'}}>
              <div className="title">
                <span>提醒种类:</span>
              </div>
            </List.Item>
          </Picker>

        <div className="remind" style={{display: this.state.len == ''?'none':''}}>
          <div className="title2">
            <span>提醒种类:</span>
          </div>
          <span className="classify">{this.state.cardName}</span>
        </div>

        <div className="change">
          <div className="one" id={this.state.key == '002'?'money':''}>
            <span>{this.state.key == '003'?'第一到期阀值:':'本日资金变动阀值'}</span>

            <input type="text" className={this.state.key == '003'?'check':''}
                   value={this.state.arrValue[0]}
                   disabled={this.state.key == '003'?true:false}/>
            <span>{this.state.PARA_UNIT}</span>
          </div>
          <div className="outer" style = {{display: this.state.key == '003'?'':'none'}}>

            <div className="one">
              <span>第二到期阀值:</span>
              <input type="text"
                     value={this.state.arrValue[1]}
                     />

              <span>{this.state.PARA_UNIT}</span>
            </div>
            <div className="one">
              <span>第三到期阀值:</span>
              <input type="text"
                     value={this.state.arrValue[2]}
                     />

              <span>{this.state.PARA_UNIT}</span>
            </div>
            <div className="one">
              <span>第四到期阀值:</span>

              <input type="text"
                     value={this.state.arrValue[3]}
                     />

              <span>{this.state.PARA_UNIT}</span>
            </div>
          </div>

          {/*{this.state.listInfo.map((item,index) => {*/}
            {/*return (*/}
              {/*<div className="one">*/}
                {/*<span>*/}
                  {/*{this.state.key == '003'?this.show(item.PARA_NAME):this.show2(item.PARA_NAME)}*/}
                {/*</span>*/}

                {/*<input type="text" value={item.PARA_VAL} autoFocus={true}*/}
                       {/*disabled={this.show(item.PARA_NAME) == "第一阀值" && this.state.key == '003' }*/}
                       {/*ref={"mes" + index} required="required"/>*/}

                {/*<span>{item.PARA_UNIT}</span>*/}
              {/*</div>*/}
            {/*)*/}
          {/*})}*/}
        </div>
        <div id="save" onClick={this.submit}>
          <span>保&nbsp;存</span>
        </div>
  		</div>
    )
  }
}

export { RemindSetting as default }
