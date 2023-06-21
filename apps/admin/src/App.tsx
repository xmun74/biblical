import { sayHello } from '@biblical/react-menu';
import { Button } from '@biblical/react-ui';

function App() {
  return (
    <div>
      admin 페이지 입니다
      <code>테스트 {sayHello()}</code>
      <Button variant="contained">버튼 From @biblical/react-ui</Button>
    </div>
  );
}
export default App;
