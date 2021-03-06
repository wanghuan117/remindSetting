import React, {PropTypes} from 'react';
import PureRenderHOC from './../../utils/hoc/index';

import Cell from './../cell/cell.web';
import SwitchItem from './switch.web';

const SwitchList = (props) => {
  const {
    switchProps,
    discription,
    onTap,
    ...others
  } = props;
  
  return (
    <Cell {...others} description={<SwitchItem {...switchProps}/>} />
  );
};


//switchProps参考SwitchItem的props, 其余的参考Cell
SwitchList.PropTypes = {
  switchProps: PropTypes.object
};

export default PureRenderHOC(SwitchList);