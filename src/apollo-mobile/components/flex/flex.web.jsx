import React, {PropTypes} from 'react';
import classNames from 'classnames';


const Flex = (props) => {
  const {className, direction, wrap, justify, align, children, ...others} = props;
  const cls = classNames('apollo-flex', {
    [`apollo-flex-${direction.replace(/-/g, '-')}`]: true,
    [`apollo-flex-${wrap.replace(/-/g, '-')}`]: true,
    [`apollo-flex-justify-${justify}`]: true,
    [`apollo-flex-align-${align}`]: true,
    [className]: className
  });

  return (
    <div {...others} className={cls}>
      {children}
    </div>
  );
};

Flex.defaultProps = {
  direction: 'row',
  wrap: 'nowrap',
  justify: 'start',
  align: 'start'
};


Flex.PropsType = {
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justify: PropTypes.oneOf(['start', 'end', 'between', 'center', 'around']),
  align: PropTypes.oneOf(['start', 'end', 'baseline', 'center', 'stretch']),
};

export default Flex;