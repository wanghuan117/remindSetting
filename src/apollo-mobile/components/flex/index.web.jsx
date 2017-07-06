import flex from './flex.web';
import item from './item.web';
import PureRenderHoc from './../../utils/hoc/index';

let Flex = PureRenderHoc(flex);
Flex.Item = PureRenderHoc(item);


export default Flex

