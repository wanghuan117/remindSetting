import React from 'react';
import classNames from 'classnames';
import PureRenderHoc from './../../utils/hoc/index';


class Icon extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {type, size, className, ...others} = this.props;
    const cls = classNames('apollo-icon',
      `apollo-icon-${type}`,
      `apollo-icon-${size || 'middle'}`,
      {[className]: className});

    return (
      <i {...others} className={cls} />
    );
  }
}

export default PureRenderHoc(Icon);
