// import io from 'socket.io-client';
import { useModals } from '@biblical/react-ui';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { modals } from '@/components/Modal/modals';

const Meetings = () => {
  /*   const webSocket = new WebSocket('ws://localhost:0');
  webSocket.onopen = function () {
    console.log('✅서버와 웹 소켓 연결 성공');
  };
  webSocket.onmessage = function (event) {
    console.log(event.data);
    webSocket.send('FE에서 서버로 답장 보냅니다!');
 */

  /* const socket = io('http://localhost:0', { path: '/socket.io' });
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('reply', '헬로 고고');
  }); */

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
      <div className=" lg:px-32">
        <div className="font-bold text-xl my-6">모임에 참여하기</div>
        <div>
          <div className="relative">
            <img src="/assets/images/meetingBg.png" alt="" className=" w-full h-[300px] rounded-[55px]" />
            <div className="absolute top-0 p-10 md:px-14 flex w-full h-full  justify-center md:justify-between items-center">
              <img src="/assets/images/meetingImg.svg" alt="" className="hidden md:block md:h-3/5 lg:h-full z-10 " />
              <div className="h-full flex flex-col justify-between md:ml-10">
                <div className="text-white text-sm md:text-base">
                  모임에 참여한 멤버끼리만 모임 내용을 공유합니다. <br />
                  교회 모임, 청년부 등 성경통독 모임을 가질 수 있습니다.
                  <br /> 모임에서 게시글을 작성해 안내사항을 전달해보세요.
                </div>
                <button
                  onClick={handleMeetCreateModal}
                  className="bg-white rounded-xl p-4 flex justify-between hover:opacity-80 transition-all"
                >
                  <div>
                    <div className="text-xl font-bold">모임 만들기</div>
                    <div className="text-xs text-slate-400">팀원을 초대해 보세요!</div>
                  </div>
                  <div className="bg-accent-600 w-10 h-10 rounded-full flex justify-center items-center text-white">
                    +
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="font-bold text-xl mt-12 mb-6">내 모임</div>
        <Link
          to={`/`}
          className="flex justify-between items-center border-b p-4 bg-orange-50 rounded-xl border border-orange-100 hover:border-orange-200"
        >
          <div>
            <div className="font-bold">meetName</div>
            <div className="text-slate-400">00명</div>
          </div>
          <div className="bg-accent-600 w-10 h-10 rounded-full flex justify-center items-center text-white">{`->`}</div>
        </Link>
      </div>
    </Layout>
  );
};
export default Meetings;
