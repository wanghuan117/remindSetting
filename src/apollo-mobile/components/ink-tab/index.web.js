/**
 * component: ink-tabs
 * description: 更多props参考rc-tabs。@important (其中为了适配react-lite(存在refs更新问题),改写了rc-tabs的InkMixin) 
 * author: Ray
 */
import React, {PropTypes} from 'react';
import RcTabs from 'rc-tabs';
import classNames from 'classnames';
import PureRenderHoc from './../../utils/hoc/index';

const prefixCls = 'apollo-ink-tabs';
let InkTab = (props) => {
  let {
    animation,
    position,
    children,
    transitionName,
    className,
    ...others
  } = props;
  if (!animation) {
    transitionName = {};
    animation = '';
  }
  
  const cls = classNames({
    [`${prefixCls}-no-animation`] : !animation,
    [className] : className
  });

  return (
    <RcTabs
      {...others}
      className={cls}
      prefixCls={prefixCls}
      allowScrollBar={false}
      tabPosition={position}
      transitionName={transitionName}
    >
      {
        children
      }
    </RcTabs>
  )
};

InkTab.PropTypes = {
  animation:PropTypes.bool,
  position: PropTypes.oneOf(['top','bottom']),
  onChange: PropTypes.func,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  transitionName: PropTypes.object
};

InkTab.defaultProps = {
  animation: true,
  position: 'top',
  transitionName: {
    backward : 'apollo-am-slide-horizontal-backward',
    forward: 'apollo-am-slide-horizontal-forward'
  }
};

InkTab = PureRenderHoc(InkTab);


const Panel = (props) => {
  return (
    <RcTabs.TabPane {...props} />
  )
};

Panel.PropTypes = {
  key: PropTypes.string.isRequired,
  tab: PropTypes.string,
  disabled: PropTypes.bool
};

Panel.defaultProps = {
  disabled: false
};

InkTab.Panel = PureRenderHoc(Panel);
export default InkTab;

