import { useState } from 'react';
import { BIBLE_BOOKS } from '@/constants/bible';

const useBibleIndex = () => {
  const [books, setBooks] = useState({ label: 'BOOK', options: BIBLE_BOOKS, selected: '' });
  const [chapters, setChapters] = useState({ label: 'CHAPTER', options: ['1', '2', '3', '4'], selected: '' });
  const [verses, setVerses] = useState({ label: 'VERSE', options: ['1', '2'], selected: '' });
  return { books, chapters, verses, setBooks, setChapters, setVerses };
};
export default useBibleIndex;
