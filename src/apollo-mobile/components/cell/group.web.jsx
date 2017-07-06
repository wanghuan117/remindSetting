import React , {PropTypes} from 'react';
import classNames from 'classnames';

const groupPrefixCls = 'apollo-cells';

const Group = (props) => {
  const {
    header,
    children,
    className,
    ...others
  } = props;
  const cls = classNames({
    [groupPrefixCls]: true,
    [className]:className
  });

  return (
    <div {...others} className={cls}>
      {
        header?<div className={`${groupPrefixCls}-header`}>{header}</div>:null
      }
      <div className={`${groupPrefixCls}-content`}>
        {
          children
        }
      </div>
    </div>
  );
};

Group.PropTypes = {
  header: PropTypes.any
};

export default Group;
