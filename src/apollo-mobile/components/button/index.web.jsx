import PureRenderHoc from './../../utils/hoc/index';
import Btn from './button.web';
import Group from './buttonGroup.web';

let Button = PureRenderHoc(Btn);
Button.Group = PureRenderHoc(Group);



export default Button;