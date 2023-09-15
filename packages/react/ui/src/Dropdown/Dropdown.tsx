import {
  HTMLAttributes,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

type DropdownStateContextProps = {
  isOpen: boolean;
  value: string[];
  multiSelect: boolean;
};
type DropdownDispatchContextProps = {
  toggleDropdown: () => void;
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  open: () => void;
  close: () => void;
};

/** State Context */
export const DropdownStateContext = createContext<DropdownStateContextProps>({
  isOpen: false,
  value: [''],
  multiSelect: false,
});
/** Dispatch Context */
export const DropdownDispatchContext = createContext<DropdownDispatchContextProps>({
  toggleDropdown: () => {},
  onChange: () => {},
  open: () => {},
  close: () => {},
});

/** DropdownMenu */
const DropdownMenu = ({
  children,
  defaultOpen = false,
  multiSelect = false,
  value = [''],
  onChange = () => {},
  className,
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
  multiSelect: boolean;
  value?: string[];
  onChange?: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <DropdownStateContext.Provider value={{ isOpen, value, multiSelect }}>
      <DropdownDispatchContext.Provider value={{ toggleDropdown, onChange, open, close }}>
        <div className={className}>{children}</div>
      </DropdownDispatchContext.Provider>
    </DropdownStateContext.Provider>
  );
};

/** DropdownMenuLabel */
interface DropdownMenuLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}
const DropdownMenuLabel = ({ children, ...other }: DropdownMenuLabelProps) => {
  return <label {...other}>{children}</label>;
};

/** DropdownMenuTrigger */
interface DropdownMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DropdownMenuTrigger = ({ children }: DropdownMenuTriggerProps) => {
  const { toggleDropdown } = useContext(DropdownDispatchContext);
  return <div onClick={toggleDropdown}>{children}</div>;
};

/** DropdownMenuGroup */
interface DropdownMenuGroupProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const DropdownMenuGroup = ({ children, ...other }: DropdownMenuGroupProps) => {
  const { isOpen } = useContext(DropdownStateContext);

  return isOpen && <ul {...other}>{children}</ul>;
};

/** DropdownMenuContent */
interface DropdownMenuContentProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const DropdownMenuContent = ({ children, ...other }: DropdownMenuContentProps) => {
  const { isOpen } = useContext(DropdownStateContext);

  return isOpen && <ul {...other}>{children}</ul>;
};

/** DropdownMenuList */
interface DropdownMenuListProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

const DropdownMenuList = ({ children, ...other }: DropdownMenuListProps) => {
  return <li {...other}>{children}</li>;
};

/** DropdownMenuItem */
interface DropdownMenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: string;
  onItemClick?: MouseEventHandler<HTMLLIElement>;
}

const DropdownMenuItem = ({ children, onItemClick, ...other }: DropdownMenuItemProps) => {
  const { onChange } = useContext(DropdownDispatchContext);
  const { value, multiSelect } = useContext(DropdownStateContext);

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    onItemClick && onItemClick(e);
    if (!multiSelect) {
      onChange([children]);
    }
    if (multiSelect) {
      if (value.includes(children)) {
        const filtered = value.filter(v => v !== children);
        onChange(filtered);
      } else {
        onChange([...value, children]);
      }
    }
  };
  return (
    <li onClick={handleItemClick} {...other}>
      {children}
    </li>
  );
};

const Root = DropdownMenu;
const Label = DropdownMenuLabel;
const Trigger = DropdownMenuTrigger;
const Group = DropdownMenuGroup;
const List = DropdownMenuList;
const Content = DropdownMenuContent;
const Item = DropdownMenuItem;

export {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuList,
  DropdownMenuContent,
  DropdownMenuItem,
  //
  Root,
  Label,
  Trigger,
  Group,
  List,
  Content,
  Item,
};
export type {
  DropdownStateContextProps,
  DropdownDispatchContextProps,
  DropdownMenuLabelProps,
  DropdownMenuTriggerProps,
  DropdownMenuGroupProps,
  DropdownMenuContentProps,
  DropdownMenuListProps,
  DropdownMenuItemProps,
};
