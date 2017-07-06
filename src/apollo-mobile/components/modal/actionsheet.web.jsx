import React from 'react';
import ReactDom from 'react-dom';
import Tappable from 'react-tappable';
import Modal from './modal.web';


/**
 * options {
 *  items:[],
 *  cancelIndex:number,
 *  titleText:string,
 * }
 *
 */

const ActionSheet = (...args) => {
  const options = args[0];
  const callback = args[1];
  if(typeof options === 'function' || !options.items)
    return;

  let div = document.createElement('div');
  // div.style.willChange = 'transform';
  document.body.appendChild(div);

  const actionSheetWrapCls = 'apollo-modal-action-sheet-wrap';

  const close = () => {
    ReactDom.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  };

  const tapHandle = (index) => ()=> {
    close();
    if (callback && typeof callback === 'function') {
      callback(index);
    }
  };

  const content = (options) => {
    let {items,cancelIndex,titleText} = options;
    return (
      <div
        className="apollo-modal-btn-group-vertical"
      >
        {
          titleText ? <button
            className="apollo-modal-btn"
          >
            {titleText}
          </button> : null
        }
        {
          items.map((item,index) => {
            if (index === cancelIndex)
              return null;
            return (
              <Tappable
                key={`action-sheet-btn-${index}`}
                className="apollo-modal-btn"
                onTap={tapHandle(index)}
                component="button"
                preventDefault
              >
                {item}
              </Tappable>
            );
          })
        }
        {
          cancelIndex ?<div className="apollo-ui-1px-t" style={{height:8}}></div>:null
        }
        {
          cancelIndex ? <Tappable
            key='action-sheet-btn-cancel'
            className="apollo-modal-btn apollo-modal-action-sheet-cancel"
            onTap={tapHandle(cancelIndex)}
            component="button"
            preventDefault
          >
            {items[cancelIndex]}
          </Tappable> : null
        }
      </div>
    );

  };


  ReactDom.render((
    <Modal
      visible
      type="action-sheet"
      wrapClassName={actionSheetWrapCls}
      maskTransitionName="apollo-am-fade"
      footer={content(options)}
    />
  ),div);

};


export default ActionSheet;