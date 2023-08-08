# useModals

- ModalPortal
  - React Portal을 사용하여 모달 생성
- ModalProvider
  - 전역에서 모달의 상태, 함수를 사용하기 위해 Provider를 추가해야 한다.
- useModals
  - openModal은 Component, props를 전달하고 closeModal은 Component만 전달하면 된다.

1. `app.tsx`나 `index.tsx`에 Provider 추가

```tsx
// index.tsx
import { ModalProvider } from '@biblical/react-ui';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>
);
```

2. 페이지에서 모달추가하기

- onSubmit 함수에 매개변수 전달한 경우

  ```tsx
  import { useModals } from '@biblical/react-ui';
  import Layout from '@/components/Layout';
  import { modals } from '@/components/Modal/modals';

  const Meetings = () => {
    const { openModal } = useModals();
    const handleMeetCreateModal = () => {
      openModal(modals.meetCreateModal, {
        onSubmit: async (value: string) => {
          // value : 모달 컴포넌트에서넘겨준값
          if (typeof value === 'string') {
            setTimeout(() => {
              console.log('3초 후, 모달컴포넌트에서 값받고 페이지에서 제출.', value);
            }, 3000);
          }
        },
      });
    };

    return (
      <Layout>
        <button onClick={handleMeetCreateModal}>모달 열기</button>
      </Layout>
    );
  };
  export default Meetings;
  ```

- onSubmit 함수에 매개변수 전달안한 경우

  ```tsx
  // ...생략
  const Meetings = () => {
    const { openModal } = useModals();
    const handleMeetCreateModal = () => {
      openModal(modals.meetCreateModal, {
        onSubmit: () => {
          console.log('페이지에서 기본 제출 동작.');
        },
      });
    };
  };
  // ...생략
  ```

---

- 각 `apps 프로젝트` 내에서 modals 객체 정의하여 관리

```tsx
import MeetingCreateModal from './MeetingCreateModal';

export const modals = {
  meetCreateModal: MeetingCreateModal,
};
```

- 모달 예시

```tsx
// apps/web/src/components/Modal/MeetingCreateModal.tsx
const MeetingCreateModal = ({ onSubmit, onClose }: { onSubmit?: (value: string) => void; onClose?: () => void }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      await onSubmit('모달에서 입력한 값');
      onClose();
    }
  };
  const handleClickCancel = () => {
    onClose();
  };

  return (
    <div role="document" tabIndex={-1}>
      <label id="title-dialog">모임생성</label>
      <form onSubmit={handleSubmit}>
        <input placeholder="모달 내 인풋 입력창입니다." />
        <div>
          <button type="submit">확인</button>
          <button onClick={handleClickCancel}>취소</button>
        </div>
      </form>
    </div>
  );
};
export default MeetingCreateModal;
```
