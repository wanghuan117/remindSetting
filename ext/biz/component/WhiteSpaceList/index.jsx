/*周毅 2017-5-12
  使用方法 import  ExtListLg from '../....../component/WhiteSpaceList'
  data : object : 数据  {"key":"city","name":"城市","placeholder":"请输入城市","icon":"duigou"},
  fontSize : string : 字体大小(默认16号)
  color : string : 字体颜色(RGB||16进制)
  border ：string ：底部border(eg:1px solid red) 
  fontWeight : string : 字体是否加粗bold||300||400... ...
  WhiteSpace : number : 左右留白(默认16px)
  iconColor: string : Icon 颜色(RGB||16进制)
  onTap : function(e) : Icon点击事件(e获取当前项key)
  onBlur : function() : Input失去焦点事件 e.target.value获取value值||e.target.key 获取项的key
*/
// 数据格式
// const data = [
//       {"key":"city","name":"城市","placeholder":"请输入城市","icon":"duigou"},
//       {"key":"tenement","name":"物业名称","placeholder":"请输物业名称"},
//       {"key":"houses","name":"楼盘名称","placeholder":"请输入楼盘名称"},
//       {"key":"element","name":"楼栋号","placeholder":"请输入楼栋号"},
//       {"key":"AllFloor","name":"总楼层","placeholder":"请输入总楼层"},
//       {"key":"floor","name":"楼层","placeholder":"请输入楼层"},
//       {"key":"roomNumber","name":"房号","placeholder":"请输入房号"},
//   ]

import React,{PureComponent} from 'react';
import { Icon } from  'apollo-mobile';
import './index.less';
class ExtListLg extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      data:this.props.data,
      length:0
    }
  }

  componentWillMount(){
    // 取出name最大字段
    let a = 0 , b = '';
    this.state.data.forEach((element, index) => {
      b = element.name.length;
      a = a > b ? a : b;
    });
    this.setState({
      length:a
    })
  }

  onTap = (e) => {
    return ()=>{this.props.onTap(e)}
  }

  render(){
    const winWidth = document.documentElement.clientWidth - 52;
    const minWidth = this.state.length * 16;
    const row = this.state.data.map((item,index)=>{
      let proportion = (this.state.length - item.name.length);
      // console.log(proportion)
      let nameArr = item.name.split('');
      // console.info(nameArr.length)
      return(
        <div 
          className="ext-list-lg" 
          id={item.key}
          style={{
            "borderBottom":this.props.border || "1px solid #d9d9d9",
            "fontSize":this.props.fontSize || 16,
            "width":winWidth
          }}
        >
            <div 
              className="lg-list-1"
              style={{
                "minWidth":minWidth,
                "paddingLeft": this.props.WhiteSpace || 16,
                "paddingRight": this.props.WhiteSpace || 16 
              }}
            >
              {
                nameArr.map((name,n)=>
                  <span 
                    style={{
                      "flex":"1",
                      "color":this.props.color,
                      "fontWeight":this.props.fontWeight,
                      "letterSpacing":n == nameArr.length-1?'0':((proportion)*(this.props.fontSize||16/(nameArr.length-1)))}}>
                    {name}
                  </span>
                )
              }
            </div>

            <div 
              className="lg-list-2"
              style={{"minWidth":winWidth - minWidth - (this.props.WhiteSpace || 16*2) - 30}}
            >
              <input type="text" name={item.key} placeholder={item.placeholder} onblur={this.props.onBlur} />
            
              <div className="lg-list-3" style={{"minWidth":30}}
                >
                  {item.icon?
                    <Icon 
                      type={item.icon}
                      style={{"color":this.props.iconColor}}
                      onClick = {this.onTap(item.key)}
                    />:null
                  }
              </div>
            </div>
            
        </div>
      ) 
    })

    return(
      <div className="ext-list">
        {row}
      </div>
    )
  }
}

export { ExtListLg as default }