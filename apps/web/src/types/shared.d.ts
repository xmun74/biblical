type ModalProps<T = unknown> = {
  onSubmit?: (value?: T) => void;
  onClose?: () => void;
};
