import { sayHello } from '@biblical/react-menu';
import { Button } from '@biblical/react-ui';

const Main = () => {
  return (
    <div>
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
