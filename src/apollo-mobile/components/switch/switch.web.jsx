import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Tappable from 'react-tappable';
import PureRenderHOC from './../../utils/hoc/index';


const prefixCls = 'apollo-switch';

const Switch = (props) => {
  const {
    disabled,
    name,
    value,
    defaultValue,
    onChange,
    className,
    ...others
  } = props;

  const cls = classNames({
    [prefixCls]: true,
    [`${prefixCls}-disabled`]: disabled,
    [className]: className
  });

  const changeHandle = (e) => {
    let value = e.target.checked;
    onChange && onChange(value, e);
    e.stopPropagation();
  };

  return (
    <input
      {...others}
      type="checkbox"
      name={name}
      className={cls}
      checked={value}
      defaultChecked={defaultValue}
      onChange={changeHandle}
      {...(disabled ? {disabled: 'true'} : '')}
    />
  );
};
export default PureRenderHOC(Switch);

