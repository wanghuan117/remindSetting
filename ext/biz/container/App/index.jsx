import React,{PureComponent} from 'react';
import {TabBar, Navigator, Icon} from 'apollo-mobile';
import './index.less';
class App extends PureComponent {

  //通过contextTypes来指定所需要的context元素
  static contextTypes = {
    router: React.PropTypes.any
  };

  //指定传递给子组件的属性需要先通过childContextTypes指定
  static childContextTypes = {
    router: React.PropTypes.any,
    setTitleBar: React.PropTypes.func
  };

  //模拟请求系统编号
  componentWillMount() {

  }

  //指定传递给子组件的属性
  getChildContext() {
    return {
      setTitleBar: (arg) => {
        //根据server中的是否挡板模式，选择使用h5的标题还是客户端标题
        window.mockDebug?
          this.setState({
            header: arg
          })
          :window.CUBE.setTitle(arg);
      }
    };
  };

  constructor(props){
    super(props);
    this.countFontSize();
    this.state={
      hidden:false,
      header: {
        title: ''
      },
    };
  };

  //计算根字体大小
  countFontSize = () => {
    let docWidth = document.documentElement.clientWidth;
    let countFontSize = Math.round(10 * (docWidth/375));
    window.countFontSize=countFontSize;
    document.documentElement.style.fontSize = countFontSize + 'px';
    console.log("根字体大小："+countFontSize)
  };

  render(){

    const {title,...othersOfHeader} = this.state.header;

    //h5挡板模式下的标题栏
    const H5Header=(
      <Navigator className="demo-header" {...othersOfHeader}>{title}</Navigator>
    );

    const _xml = (
      <div className="container">
        {window.mockDebug?H5Header:null}
        {this.props.children}
      </div>
    );

    return _xml

  }
}

export {App as default}
