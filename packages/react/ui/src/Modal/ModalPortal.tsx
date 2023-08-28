import { useContext } from 'react';
import ReactDom from 'react-dom';
import { ModalDispatchContext, ModalStateContext } from './ModalProvider';

/** Modals - 기본 모달 CSS 적용*/
const Modals = () => {
  const openModals = useContext(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);

  return openModals.map((m, i) => {
    const { Component, props } = m;
    const { onSubmit, ...restProps } = props;
    const onClose = () => close(Component);

    return (
      <div className="modal" role="dialog" aria-labelledby="title-dialog" key={i}>
        <div className="modal-backdrop" role="presentation" onClick={onClose} />
        <div className="modal-content">
          <div className="modal-content__closeBtn">
            <button type="button" onClick={onClose}>
              <svg viewBox="0 0 24 24">
                <path d="M17.97 19.03a.749.749 0 1 0 1.06-1.06l-6.5-6.5a.749.749 0 0 0-1.06 0l-6.5 6.5a.749.749 0 1 0 1.06 1.06L12 13.06l5.97 5.97zM12 10.94 6.03 4.97a.749.749 0 1 0-1.06 1.06l6.5 6.5a.749.749 0 0 0 1.06 0l6.5-6.5a.749.749 0 1 0-1.06-1.06L12 10.94z"></path>
              </svg>
            </button>
          </div>
          <div className="modal-content__main">
            <Component {...restProps} onClose={onClose} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    );
  });
};

const ModalPortal = () => {
  const element = document.getElementById('modal-root') as Element;
  return ReactDom.createPortal(<Modals />, element);
};
export default ModalPortal;
