import * as DropdownMenu from '@biblical/react-ui';

interface Props {
  options: string[];
  defaultOpen: boolean;
  multiSelect: boolean;
  label?: string;
  trigger?: JSX.Element;
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  onItemClick?: () => void;
}
const Select = ({ options, defaultOpen, multiSelect, label, trigger, value, onChange, onItemClick }: Props) => {
  return (
    <DropdownMenu.Root value={value} onChange={onChange} defaultOpen={defaultOpen} multiSelect={multiSelect}>
      <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>{label}</DropdownMenu.Label>
        <DropdownMenu.Group className="max-h-[400px] overflow-y-scroll scrollbar_option">
          {options.map(option => (
            <DropdownMenu.Item
              key={option}
              className={`px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                value.includes(option) ? 'text-blue-500 font-semibold' : 'text-slate-500'
              }`}
              onItemClick={onItemClick}
            >
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
export default Select;
