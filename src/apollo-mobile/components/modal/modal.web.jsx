import React, {PropTypes} from 'react';
import Dialog from 'rc-dialog';
import classNames from 'classnames';
import PureRenderHoc from './../../utils/hoc/index';


const Modal = (props) => {
  let {
    type,
    prefixCls,
    className,
    wrapClassName,
    style,
    bodyStyle,
    maskStyle,
    visible,
    transitionName,
    maskTransitionName,
    closable,
    maskClosable,
    onClose,
    footer,
    fullScreen,
    children,
    ...others
  } = props;


  if (type === 'alert' && transitionName === 'apollo-am-slide-up') {
    transitionName = 'apollo-am-zoom'
  }


  if (type === 'popup') type = 'page';

  const cls = classNames({
    [className]: className,
    [`${prefixCls}-${type}`]: true,
  });

  return (
    <Dialog
      {...others}
      prefixCls={prefixCls}
      className={cls}
      wrapClassName={`${wrapClassName || ''} ${fullScreen || type === 'alert'?`${prefixCls}-full-screen`:''}`}
      style={style}
      bodyStyle={bodyStyle}
      maskStyle={maskStyle}
      visible={visible}
      transitionName={transitionName}
      maskTransitionName={maskTransitionName}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      footer={footer}
    >
      {children}
    </Dialog>
  );

};

Modal.PropTypes = {
  type: PropTypes.oneOf(['alert', 'popup']),
  prefixCls: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  wrapClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object,
  bodyStyle: PropTypes.object,
  maskStyle: PropTypes.object,
  visible: PropTypes.bool,
  transitionName: PropTypes.string,
  maskTransitionName: PropTypes.string,
  closable: PropTypes.bool,
  maskClosable: PropTypes.bool,
  footer: PropTypes.element,
  onClose: PropTypes.func,
  fullScreen: PropTypes.bool
};

Modal.defaultProps = {
  type: 'popup',
  prefixCls: 'apollo-modal',
  style: {},
  bodyStyle: {},
  maskStyle: {},
  visible: false,
  transitionName: 'apollo-am-slide-up',
  maskTransitionName: 'apollo-am-fade',
  closable: false,
  maskClosable: false,
  fullScreen: false
};


export default PureRenderHoc(Modal);
