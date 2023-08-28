import { useEffect, useState } from 'react';
import { getBibleAPI } from '@/apis';
import Back from '@/assets/svg/Back.svg';
import { BIBLE_BOOKS } from '@/constants/bible';

const Bible = () => {
  const [bible, setBible] = useState<BibleProps[]>([]);
  const [searchQuery, setSearchQuery] = useState({
    book: 1,
    chapter: 1,
    verse: 1,
  });

  useEffect(() => {
    const fetch = async () => {
      let bookString: number | string = searchQuery.book;
      if (searchQuery.book < 10) {
        bookString = '0' + String(searchQuery.book);
      }
      const { data } = await getBibleAPI(String(bookString), String(searchQuery.chapter));
      console.log('bible :', data);
      setBible(data);
    };
    fetch();
  }, [searchQuery]);

  const isFirstVerse = searchQuery.book === 1 && searchQuery.chapter === 1 && searchQuery.verse === 1;
  const isLastVarse = searchQuery.book === 66 && searchQuery.chapter === 22 && searchQuery.verse === 21;

  const handleClickNext = async () => {
    if (isLastVarse) {
      return;
    }
    setSearchQuery({ ...searchQuery, chapter: searchQuery.chapter + 1 });
  };
  const handleClickPre = async () => {
    if (isFirstVerse) {
      return;
    }
    setSearchQuery({ ...searchQuery, chapter: searchQuery.chapter - 1 });
  };

  return (
    <>
      <nav className="sticky top-[70px] md:top-[80px] flex justify-center p-3 border-b border-t border-slate-200 bg-white/50 backdrop-blur-xl">
        <div className="w-[640px] flex justify-between">
          <span className="font-bold text-xl">
            {BIBLE_BOOKS[searchQuery.book - 1]} {searchQuery.chapter}장
          </span>
          <button>검색</button>
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
              <div key={i} className="leading-7 mb-2">
                <span className="align-top text-xs p-1 mr-1 text-slate-500">{v.verse}</span>
                <span className="text-lg">{v.content}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Bible;
