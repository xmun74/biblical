import { sayHello } from '@biblical/react-menu';
import { Button } from '@biblical/react-ui';
import { useState } from 'react';
import Select from '@/components/common/Select';

const Main = () => {
  const [word, setWord] = useState(['']);
  return (
    <div>
      {word} 멀티 선택입니다
      <Select
        value={word}
        onChange={setWord}
        label="목차"
        defaultOpen={false}
        trigger={<div>열려라</div>}
        options={['1', '2', '3']}
        multiSelect={true}
      />
      <code>함수 테스트 {sayHello()}</code>
      <Button variant="contained">버튼 From @biblical/react-ui</Button>
      <div>
        <input type="text" placeholder="검색어를 입력해주세요." className="border border-slate-200 rounded-md" />
        <Button variant="contained">검색</Button>
      </div>
    </div>
  );
};
export default Main;
