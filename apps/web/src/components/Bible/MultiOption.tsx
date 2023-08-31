import { SetStateAction } from 'react';
import MenuClose from '@/assets/svg/MenuClose.svg';
import { BIBLE_BOOKS } from '@/constants/bible';

interface MultiOptionProps {
  setIndexOpen: React.Dispatch<SetStateAction<boolean>>;
  totalChapterCnt: number[];
  totalVerseCnt: number[];
  searchQuery: {
    book: number;
    chapter: number;
    verse: number;
  };
  onBookClick?: (bookIdx: number) => void;
  onChapterClick?: (chapter: number) => void;
  onVerseClick?: (verse: number) => void;
}

const MultiOption = ({
  setIndexOpen,
  totalChapterCnt,
  totalVerseCnt,
  searchQuery,
  onBookClick,
  onChapterClick,
  onVerseClick,
}: MultiOptionProps) => {
  return (
    <div className="absolute top-11 w-[350px] bg-white rounded-md shadow-sm">
      <div className="px-3 py-1.5 flex justify-between items-center bg-gradient-to-r bg-accent-600/60 rounded-t-md">
        <span className="font-bold text-white text-sm">목차 검색</span>
        <button onClick={() => setIndexOpen(false)}>
          <MenuClose fill="white" width="22px" height="22px" />
        </button>
      </div>

      <div className="grid grid-cols-4">
        <div className="col-span-2 border-r">
          <label className="py-0.5 text-[10px] flex justify-center text-slate-400 bg-slate-100">BOOK</label>
          <ul className="max-h-[400px] overflow-y-scroll scrollbar_option">
            {BIBLE_BOOKS?.map((b, i) => (
              <li
                key={b}
                className={`px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                  BIBLE_BOOKS[searchQuery?.book - 1] === b ? 'text-blue-500 font-semibold' : 'text-slate-500'
                }`}
                onClick={() => onBookClick(i + 1)}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 border-r">
          <label className="py-0.5 text-[10px] flex justify-center text-slate-400 bg-slate-100">CHAPTER</label>
          <ul className="max-h-[400px] overflow-y-scroll scrollbar_option">
            {totalChapterCnt?.map(c => (
              <li
                key={c}
                className={`text-center px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                  searchQuery?.chapter === c ? 'text-blue-500 font-semibold' : 'text-slate-500'
                }`}
                onClick={() => onChapterClick(c)}
              >
                {c}장
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          <label className="py-0.5 text-[10px] flex justify-center text-slate-400 bg-slate-100">VERSE</label>
          <ul className="max-h-[400px] overflow-y-scroll scrollbar_option">
            {totalVerseCnt?.map(v => (
              <li
                key={v}
                className={`text-center px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                  searchQuery?.verse === v ? 'text-blue-500 font-semibold' : 'text-slate-500'
                }`}
                onClick={() => onVerseClick(v)}
              >
                {v}절
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-4 p-2 bg-slate-100">
          <div className="flex justify-center p-2 bg-white rounded-md text-blue-500 font-semibold">
            {BIBLE_BOOKS[searchQuery?.book - 1]} {searchQuery?.chapter}장 {searchQuery?.verse}절
          </div>
        </div>
      </div>
    </div>
  );
};
export default MultiOption;
