import React from 'react';
import Tappable from 'react-tappable';
import classNames from  'classnames';


const Button = (props) => {
  const {type, size, disabled, plain, className, inline, onTap, children, ...others} = props;
  const cls = classNames('apollo-btn', {
    [`apollo-btn-${type}`]: !plain,
    [`apollo-btn-plain-${type}`]: plain,
    'apollo-btn-small': size === 'small',
    'apollo-btn-inline': inline,
    'apollo-btn-disabled': disabled,
    [className]: className
  });
  return (
    <Tappable {...others}
      onTap={disabled ? null : onTap}
      className={cls}
      disabled={disabled}
      component="button"
    >{children}</Tappable>
  )
};

Button.propTypes = {
  type: React.PropTypes.oneOf(['default','primary','warn']),
  size: React.PropTypes.oneOf(['small','default']),
  plain: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  className: React.PropTypes.string,
  onTap: React.PropTypes.func
};

Button.defaultProps = {
  type: 'default',
  size: 'default',
  plain: false,
  inline: false,
  disabled: false
};

export default Button;