import { useEffect, useState } from 'react';
import { getBibleAPI } from '@/apis';
import Back from '@/assets/svg/Back.svg';
import Search from '@/assets/svg/Search.svg';
import { BIBLE_BOOKS } from '@/constants/bible';

const Bible = () => {
  const [bible, setBible] = useState<BibleProps[]>([]);
  const [searchQuery, setSearchQuery] = useState({
    book: 1,
    chapter: 1,
    verse: 1,
  });
  const [chapterCnt, setChapterCnt] = useState<number>();
  const [preChapterCnt, setPreChapterCnt] = useState<number>();

  useEffect(() => {
    const fetch = async () => {
      const { data, chapterCount } = await getBibleAPI(searchQuery.book, searchQuery.chapter);
      console.log('bible :', data, chapterCount);
      setBible(data);
      setChapterCnt(Number(chapterCount));
    };
    fetch();
  }, [searchQuery]);

  const isFirstVerse = searchQuery.book === 1 && searchQuery.chapter === 1 && searchQuery.verse === 1;
  const isLastVarse = searchQuery.book === 66 && searchQuery.chapter === 22 && searchQuery.verse === 21;

  const handleClickNext = async () => {
    if (isLastVarse) {
      return;
    }
    if (searchQuery.chapter === chapterCnt) {
      setSearchQuery({ book: searchQuery.book + 1, chapter: 1, verse: 1 });
      setPreChapterCnt(chapterCnt);
    } else {
      setSearchQuery({ ...searchQuery, chapter: searchQuery.chapter + 1 });
    }
  };
  const handleClickPre = async () => {
    if (isFirstVerse) {
      return;
    }
    if (searchQuery.chapter === 1) {
      setSearchQuery({ book: searchQuery.book - 1, chapter: preChapterCnt, verse: 1 });
    } else {
      setSearchQuery({ ...searchQuery, chapter: searchQuery.chapter - 1 });
    }
  };

  return (
    <>
      <nav className="sticky top-[70px] md:top-[80px] flex justify-center p-3 border-b border-t border-slate-200 bg-white/50 backdrop-blur-xl">
        <div className="w-[640px] flex justify-between">
          <button className="flex items-center">
            <span className="font-bold text-xl mr-4">
              {BIBLE_BOOKS[searchQuery.book - 1]} {searchQuery.chapter}장
            </span>
            <div className="-rotate-90">
              <Back fill="black" width="18px" height="18px" />
            </div>
          </button>
          <button className="flex justify-center items-center border rounded-full p-2.5">
            <Search stroke="black" width="14px" height="14px" strokeWidth="8" />
          </button>
        </div>
      </nav>

      {isFirstVerse || (
        <button
          className="fixed top-[90%] md:top-[50%] left-3 md:left-9 w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full bg-white shadow-[0px_0px_10px_rgba(63,71,77,0.3)] flex justify-center items-center"
          onClick={handleClickPre}
        >
          <Back fill="black" width="18px" height="18px" />
        </button>
      )}
      {isLastVarse || (
        <button
          className="fixed top-[90%] md:top-[50%] right-3 md:right-9 w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full bg-white shadow-[0px_0px_10px_rgba(63,71,77,0.3)] flex justify-center items-center rotate-180"
          onClick={handleClickNext}
        >
          <Back fill="black" width="18px" height="18px" />
        </button>
      )}

      <div className="flex flex-col items-center px-3 xs:p-0 my-7">
        <div className="w-full md:w-[640px]">
          {bible &&
            bible?.map((v, i) => (
              <div key={i} className="flex leading-7 mb-2">
                <div>
                  <span className="align-top text-xs py-1 mr-2 text-slate-500">{v.verse}</span>
                </div>
                <span className="text-lg">{v.content}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Bible;
