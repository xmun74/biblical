import * as DropdownMenu from '@biblical/react-ui';
import { useState } from 'react';
import useBibleIndex from './hook/useBibleIndex';

interface Props {
  label?: string;
  trigger: JSX.Element;
  onBookClick?: (i: number) => void;
  onChapterClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  onVerseClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const IndexOption = ({ label, trigger, onBookClick, onChapterClick, onVerseClick }: Props) => {
  const { books, chapters, verses } = useBibleIndex();
  const [bSelected, bChange] = useState(['']);
  const [cSelected, cChange] = useState(['']);
  const [vSelected, vChange] = useState(['']);

  return (
    <DropdownMenu.Root defaultOpen={false} multiSelect={false}>
      <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content className="absolute top-11 w-[350px] bg-white rounded-md shadow-sm">
        <DropdownMenu.Label className="px-3 py-1.5 flex justify-start items-center bg-gradient-to-r bg-accent-600/60 rounded-t-md font-bold text-white text-sm">
          {label}
        </DropdownMenu.Label>

        <DropdownMenu.Group className="grid grid-cols-4">
          <DropdownMenu.Root
            value={bSelected}
            onChange={bChange}
            defaultOpen={true}
            multiSelect={false}
            className="col-span-2 border-r"
          >
            <DropdownMenu.Content>
              <DropdownMenu.Label className="py-0.5 text-[10px] flex justify-center text-slate-400 bg-slate-100">
                {books.label}
              </DropdownMenu.Label>
              <DropdownMenu.Group className="max-h-[400px] overflow-y-scroll scrollbar_option">
                {books.options.map((option: string, i: number) => (
                  <DropdownMenu.Item
                    key={option}
                    className={`px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                      bSelected.includes(option) ? 'text-blue-500 font-semibold' : 'text-slate-500'
                    }`}
                    onItemClick={() => onBookClick?.(i)}
                  >
                    {option}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <DropdownMenu.Root
            value={cSelected}
            onChange={cChange}
            defaultOpen={true}
            multiSelect={false}
            className="col-span-1 border-r"
          >
            <DropdownMenu.Content>
              <DropdownMenu.Label className="py-0.5 text-[10px] flex justify-center text-slate-400 bg-slate-100">
                {chapters.label}
              </DropdownMenu.Label>
              <DropdownMenu.Group className="max-h-[400px] overflow-y-scroll scrollbar_option">
                {chapters.options.map(option => (
                  <DropdownMenu.Item
                    key={option}
                    className={`px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                      cSelected.includes(option) ? 'text-blue-500 font-semibold' : 'text-slate-500'
                    }`}
                    onItemClick={event => onChapterClick?.(event)}
                  >
                    {option}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root
            value={vSelected}
            onChange={vChange}
            defaultOpen={true}
            multiSelect={false}
            className="col-span-1"
          >
            <DropdownMenu.Content>
              <DropdownMenu.Label className="py-0.5 text-[10px] flex justify-center text-slate-400 bg-slate-100">
                {verses.label}
              </DropdownMenu.Label>
              <DropdownMenu.Group className="max-h-[400px] overflow-y-scroll scrollbar_option">
                {verses.options.map(option => (
                  <DropdownMenu.Item
                    key={option}
                    className={`px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                      vSelected.includes(option) ? 'text-blue-500 font-semibold' : 'text-slate-500'
                    }`}
                    onItemClick={event => onVerseClick?.(event)}
                  >
                    {option}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
export default IndexOption;
