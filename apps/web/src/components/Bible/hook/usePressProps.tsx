import { useState } from 'react';

const usePressProps = () => {
  const [searchQuery, setSearchQuery] = useState({
    book: 1,
    chapter: 1,
    verse: 1,
  });

  const onBookClick = (bookIdx: number) => {
    setSearchQuery({ ...searchQuery, book: bookIdx, chapter: 1, verse: 1 });
  };
  const onChapterClick = async (chapter: number) => {
    setSearchQuery({ ...searchQuery, chapter });
  };
  const onVerseClick = (verse: number) => {
    setSearchQuery({ ...searchQuery, verse });
  };
  return { searchQuery, setSearchQuery, onBookClick, onChapterClick, onVerseClick };
};
export default usePressProps;
