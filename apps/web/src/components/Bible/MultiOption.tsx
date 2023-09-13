import { SetStateAction, useEffect, useRef } from 'react';
import MenuClose from '@/assets/svg/MenuClose.svg';
import { BIBLE_BOOKS } from '@/constants/bible';

type MultiOptionProps = {
  setIndexOpen: React.Dispatch<SetStateAction<boolean>>;
  totalChapterCnt: number[];
  totalVerseCnt: number[];
  searchQuery: Bible;
  onBookClick?: (bookIdx: number) => void;
  onChapterClick?: (chapter: number) => void;
  onVerseClick?: (verse: number) => void;
};

const MultiOption = ({
  setIndexOpen,
  totalChapterCnt,
  totalVerseCnt,
  searchQuery,
  onBookClick,
  onChapterClick,
  onVerseClick,
}: MultiOptionProps) => {
  const bookUlRef = useRef<HTMLUListElement>(null);
  const chapterUlRef = useRef<HTMLUListElement>(null);
  const verseUlRef = useRef<HTMLUListElement>(null);
  const bookLiRef = useRef<HTMLLIElement | null>(null);
  const chapteLiRef = useRef<HTMLLIElement | null>(null);
  const verseLiRef = useRef<HTMLLIElement | null>(null);

  const scrollToItem = (ulRef: React.RefObject<HTMLUListElement>, liRef: React.RefObject<HTMLLIElement>) => {
    if (ulRef && liRef) {
      return ulRef.current?.scrollTo({ top: liRef.current?.offsetTop - ulRef.current?.offsetTop });
    } else {
      return;
    }
  };

  useEffect(() => {
    scrollToItem(bookUlRef, bookLiRef);
    scrollToItem(chapterUlRef, chapteLiRef);
    scrollToItem(verseUlRef, verseLiRef);
  }, []);

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
          <ul className="max-h-[400px] overflow-y-scroll scrollbar_option" ref={bookUlRef}>
            {BIBLE_BOOKS?.map((b, i) => (
              <li
                key={b}
                className={`px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                  BIBLE_BOOKS[searchQuery?.book - 1] === b ? 'text-blue-500 font-semibold' : 'text-slate-500'
                }`}
                onClick={() => onBookClick(i + 1)}
                ref={BIBLE_BOOKS[searchQuery?.book - 1] === b ? bookLiRef : null}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 border-r">
          <label className="py-0.5 text-[10px] flex justify-center text-slate-400 bg-slate-100">CHAPTER</label>
          <ul className="max-h-[400px] overflow-y-scroll scrollbar_option" ref={chapterUlRef}>
            {totalChapterCnt?.map(c => (
              <li
                key={c}
                className={`text-center px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                  searchQuery?.chapter === c ? 'text-blue-500 font-semibold' : 'text-slate-500'
                }`}
                onClick={() => onChapterClick(c)}
                ref={searchQuery?.chapter === c ? chapteLiRef : null}
              >
                {c}장
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          <label className="py-0.5 text-[10px] flex justify-center text-slate-400 bg-slate-100">VERSE</label>
          <ul className="max-h-[400px] overflow-y-scroll scrollbar_option" ref={verseUlRef}>
            {totalVerseCnt?.map(v => (
              <li
                key={v}
                className={`text-center px-3 py-1 hover:bg-slate-50 cursor-pointer ${
                  searchQuery?.verse === v ? 'text-blue-500 font-semibold' : 'text-slate-500'
                }`}
                onClick={() => onVerseClick(v)}
                ref={searchQuery?.verse === v ? verseLiRef : null}
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
