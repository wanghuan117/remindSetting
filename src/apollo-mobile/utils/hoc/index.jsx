import React, {PureComponent} from 'react';
import Animate from 'rc-animate';


const PureRenderHoc = (Comp) => {
  class WrapperComp extends PureComponent {
    render() {
      return (
        <Comp {...this.props}/>
      );
    };
  }
  return WrapperComp;
};

const TransitionPageHoc = (Comp) => {
  class WrapperComp extends PureComponent {
    componentWillUnmount() {
      console.log(this.getDOMNode());
      this.getDOMNode().display = 'none';
    }
    render() {
      return (
        <Animate transitionName="apollo-am-slide-from-left" transitionAppear>
          <Comp {...this.props}/>
        </Animate>
      );
    }
  }
  return WrapperComp;
};





export {PureRenderHoc as default,TransitionPageHoc};