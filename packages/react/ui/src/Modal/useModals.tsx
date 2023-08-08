import { useContext } from 'react';
import { ModalDispatchContext } from './ModalProvider';

const useModals = () => {
  const { open, close } = useContext(ModalDispatchContext);

  const openModal = (Component: React.ComponentType, props: any) => {
    open(Component, props);
  };
  const closeModal = (Component: React.ComponentType) => {
    close(Component);
  };
  return {
    openModal,
    closeModal,
  };
};
export default useModals;
