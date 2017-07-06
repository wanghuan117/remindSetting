import cell from './cell.web';
import group from './group.web'
import PureRenderHoc from './../../utils/hoc/index';

let Cell = PureRenderHoc(cell);
Cell.Group = PureRenderHoc(group);


export default Cell;


