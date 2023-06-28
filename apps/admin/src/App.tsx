import { sayHello } from '@biblical/react-menu';
import { Button } from '@biblical/react-ui';

function App() {
  return (
    <div>
      admin 페이지 입니다
      <div className="bg-red-500 font-bold">apps/admin 앱에서 Tailwind css 적용하기</div>
      <code> {sayHello()}테스트함수</code>
      <Button variant="contained" className="font-bold bg-yellow-200">
        버튼 From @biblical/react-ui
      </Button>
    </div>
  );
}
export default App;
