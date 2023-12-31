/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { getBibleAPI, getBibleTotalCntAPI, getVerseTotalCntAPI } from '@/apis';
import Back from '@/assets/svg/Back.svg';
import Search from '@/assets/svg/Search.svg';
import MultiOption from '@/components/Bible/MultiOption';
import { QUERY_KEYS } from '@/constants';
import { BIBLE_BOOKS } from '@/constants/bible';

const Bible = () => {
  const [searchQuery, setSearchQuery] = useState({
    book: 1,
    chapter: 1,
    verse: 1,
  });

  const { data: bibleData, refetch: bibleRefetch } = useQuery<Bible[]>(
    [QUERY_KEYS.BIBLE],
    () => getBibleAPI(searchQuery.book, searchQuery.chapter),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
  // 목차 팝업
  const [indexOpen, setIndexOpen] = useState(false);
  const [totalChapterCnt, setTotalChapterCnt] = useState<number[]>([]);
  const [totalVerseCnt, setTotalVerseCnt] = useState<number[]>([]);
  // 66권 각각의 총 장수 ex) 창세기 50장
  const { data: maxChapter } = useQuery<Bible[]>([QUERY_KEYS.BIBLE_CHAPTER_CNT], getBibleTotalCntAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const createArrIncreaseByOne = useCallback((count: number) => {
    return Array.from({ length: count }, (_, i) => i + 1);
  }, []);

  const fetchVerseCnt = async () => {
    const { verseCount } = await getVerseTotalCntAPI(searchQuery.book, searchQuery.chapter);
    const initVerseCnt = createArrIncreaseByOne(verseCount?.verse);
    setTotalVerseCnt(initVerseCnt);
  };

  useEffect(() => {
    bibleRefetch();
    fetchVerseCnt();

    const initChapterCnt = createArrIncreaseByOne(maxChapter && maxChapter[searchQuery?.book - 1]?.chapter);
    setTotalChapterCnt(initChapterCnt);
  }, [searchQuery]);

  const isFirst = searchQuery.book === 1 && searchQuery.chapter === 1;
  const isLast = searchQuery.book === 66 && searchQuery.chapter === 22;

  const handleClickNext = async () => {
    if (isLast) {
      return;
    }
    if (searchQuery.chapter === maxChapter[searchQuery.book - 1]?.chapter) {
      setSearchQuery({ book: searchQuery.book + 1, chapter: 1, verse: 1 });
    } else {
      setSearchQuery({ ...searchQuery, chapter: searchQuery.chapter + 1 });
    }
  };
  const handleClickPre = async () => {
    if (isFirst) {
      return;
    }
    if (searchQuery.chapter === 1) {
      setSearchQuery({ book: searchQuery.book - 1, chapter: maxChapter[searchQuery.book - 2]?.chapter, verse: 1 });
    } else {
      setSearchQuery({ ...searchQuery, chapter: searchQuery.chapter - 1 });
    }
  };

  // 목차
  const toggleIndexBtn = () => {
    if (totalChapterCnt.length === 0) {
      const initChapterCnt = createArrIncreaseByOne(maxChapter[0]?.chapter);
      setTotalChapterCnt(initChapterCnt);
    }
    setIndexOpen(!indexOpen);
  };
  const onBookClick = (bookIdx: number) => {
    setSearchQuery({ ...searchQuery, book: bookIdx, chapter: 1, verse: 1 });
  };
  const onChapterClick = async (chapter: number) => {
    setSearchQuery({ ...searchQuery, chapter });
  };
  const onVerseClick = (verse: number) => {
    setSearchQuery({ ...searchQuery, verse });
    setIndexOpen(false);
  };

  return (
    <>
      <nav className="sticky top-[70px] md:top-[80px] flex justify-center items-center h-[50px] p-3 sm:p-1 border-b border-t border-slate-200 bg-white/70 backdrop-blur-xl">
        <div className="w-[640px] flex justify-between">
          <button className="relative flex items-center" onClick={toggleIndexBtn}>
            <span className="font-bold md:text-lg mr-4">
              {BIBLE_BOOKS[searchQuery.book - 1]} {searchQuery.chapter}장
            </span>
            <div className={`${indexOpen ? 'rotate-90' : '-rotate-90'} transition-all	`}>
              <Back fill="black" width="18px" height="18px" />
            </div>
          </button>

          {/* 수정중 */}
          {/* <IndexOption
            label="목차 검색"
            trigger={
              <button className="relative flex items-center">
                <span className="font-bold md:text-lg mr-4">
                  {BIBLE_BOOKS[searchQuery.book - 1]} {searchQuery.chapter}장
                </span>
                <div className={`${indexOpen ? 'rotate-90' : '-rotate-90'} transition-all	`}>
                  <Back fill="black" width="18px" height="18px" />
                </div>
              </button>
            }
            onBookClick={i => onBookClick(i + 1)}
            onChapterClick={event => {
              onChapterClick(Number((event.target as HTMLLIElement).textContent));
            }}
            onVerseClick={event => {
              onVerseClick(Number((event.target as HTMLLIElement).textContent));
            }}
          /> */}

          {indexOpen && (
            <MultiOption
              setIndexOpen={setIndexOpen}
              totalChapterCnt={totalChapterCnt}
              totalVerseCnt={totalVerseCnt}
              searchQuery={searchQuery}
              onBookClick={onBookClick}
              onChapterClick={onChapterClick}
              onVerseClick={onVerseClick}
            />
          )}

          <button className="w-[35px] h-[35px] flex justify-center items-center">
            <Search stroke="black" width="25px" height="25px" strokeWidth="5" />
          </button>
        </div>
      </nav>

      {isFirst || (
        <button
          className="fixed top-[90%] md:top-[50%] left-3 md:left-5 w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full bg-white shadow-sm flex justify-center items-center hover:shadow-md"
          onClick={handleClickPre}
        >
          <Back fill="black" width="18px" height="18px" />
        </button>
      )}
      {isLast || (
        <button
          className="fixed top-[90%] md:top-[50%] right-3 md:right-5 w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full bg-white shadow-sm flex justify-center items-center rotate-180 hover:shadow-md"
          onClick={handleClickNext}
        >
          <Back fill="black" width="18px" height="18px" />
        </button>
      )}

      <div className="flex flex-col items-center px-3 xs:p-0 mt-7">
        <div className="w-full md:w-[640px]">
          {bibleData &&
            bibleData?.map((v, i) => (
              <div key={i} className="flex leading-7 mb-2">
                <div>
                  <span className="align-top text-xs py-1 mr-2 text-slate-400 font-semibold">{v.verse}</span>
                </div>
                <span className="text-lg font-noto_serif">{v.content}</span>
              </div>
            ))}
        </div>
      </div>
      <footer className="mt-28 py-16 border-t flex justify-center text-xs text-slate-500">
        이 곳에서 사용한 「 성경전서 개역한글판 」 의 저작권은 재단법인 대한성서공회 소유입니다.
      </footer>
    </>
  );
};
export default Bible;
