import { createContext, useMemo, useState } from 'react';
import ModalPortal from './ModalPortal';

export interface ModalContextProps {
  Component: React.ComponentType;
  props?: any;
}

/** Modal dispatch Context */
export const ModalDispatchContext = createContext<{
  open: (Component: React.ComponentType, props: any) => void;
  close: (Component: React.ComponentType) => void;
}>({
  open: () => {},
  close: () => {},
});

/** Modals state Context */
export const ModalStateContext = createContext<ModalContextProps[]>([]);

const ModalProvider = ({ children }: { children: JSX.Element }) => {
  const [openModals, setOpenModals] = useState<ModalContextProps[]>([]);

  const open = (Component: React.ComponentType, props: any) => {
    // 모달 open - body 스크롤 막기
    document.body.style.overflow = 'hidden';
    setOpenModals(modals => {
      return [...modals, { Component, props }];
    });
  };
  const close = (Component: React.ComponentType) => {
    document.body.style.overflow = 'unset';
    setOpenModals(modals => {
      return modals.filter(m => {
        return m.Component !== Component;
      });
    });
  };
  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalStateContext.Provider value={openModals}>
      <ModalDispatchContext.Provider value={dispatch}>
        <ModalPortal />
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};
export default ModalProvider;
