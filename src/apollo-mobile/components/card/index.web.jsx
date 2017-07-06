/**
 * component: card
 * description: 分为card card.header card.body card.footer; 各个组件props见源码
 * version: 1.0.0
 * author: ray
 * date: 20160830
 */
import React, {PropTypes} from 'react';
import classNames from 'classnames';
import PureRenderHoc from './../../utils/hoc/index';


const prefixCls = 'apollo-card';

let Card = (props) => {
  const {
    className,
    children,
    ...others
  } = props;
  const cls = classNames({
    [prefixCls] : true,
    className: className
  });

  return (
    <div className={cls} {...others}>
      {children}
    </div>
  );
};

Card = PureRenderHoc(Card);


const CardHeader = (props) => {
  const {
    className,
    content,
    thumb,
    description,
    contentSize,
    descriptionSize,
    ...others
  } = props;
  const cls = classNames({
    [`${prefixCls}-header`] : true,
    className: className
  });

  return (
    <div className={cls} {...others}>
        {
          thumb? (React.isValidElement(thumb) ? thumb : <img src={thumb} className={`${prefixCls}-header-thumb`}/>): null
        }
        <div className={`${prefixCls}-header-content`} style={{flex:contentSize}}>
          {content}
        </div>
        {
          description ?
            <div className={`${prefixCls}-header-description`} style={{flex:descriptionSize}}>
              {description}
            </div> : null
        }
    </div>
  );
};


CardHeader.PropTypes = {
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  thumb:PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  contentSize: PropTypes.number,
  descriptionSize: PropTypes.number
};

CardHeader.defaultProps = {
  contentSize: 1,
  descriptionSize: 1
};

const CardBody = (props) => {
  const {
    className,
    children,
    ...others
  } = props;

  const cls = classNames({
    [`${prefixCls}-body`]: true,
    className: className
  });
  return (
    <div className={cls} {...others}>
      {children}
    </div>
  );
};

const CardFooter = (props) => {
  const {
    className,
    content,
    description,
    contentSize,
    descriptionSize,
    ...others
  } = props;
  const cls = classNames({
    [`${prefixCls}-footer`] : true,
    className: className
  });

  return (
    <div className={cls} {...others}>
      {
        content ?
          <div className={`${prefixCls}-footer-content`} style={{flex:contentSize}}>
            {content}
          </div> : null
      }
      {
        description ?
          <div className={`${prefixCls}-footer-description`} style={{flex:descriptionSize}}>
            {description}
          </div> : null
      }
    </div>
  );
};

CardFooter.PropTypes = {
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  contentSize: PropTypes.number,
  descriptionSize: PropTypes.number
};

CardFooter.defaultProps = {
  contentSize: 1,
  descriptionSize: 1
};

Card.Header = PureRenderHoc(CardHeader);
Card.Body = PureRenderHoc(CardBody);
Card.Footer = PureRenderHoc(CardFooter);


export default Card;
