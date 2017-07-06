import React from 'react';
import classNames from  'classnames';

const Group = (props) => {
  const {horizon, children} = props;
  const cls = classNames('apollo-btn-area', {
    'apollo-btn-area-inline': horizon
  });

  return (
    <div className={cls}>
      {children}
    </div>
  );
};

Group.defaultProps = {
  horizon:false
};
export default Group;