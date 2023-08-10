import Layout from '@/components/Layout';

const MeetingDetail = () => {
  // 모임 통계 test
  const testParticipant = [
    { day: '8/1', num: 23 },
    { day: '8/2', num: 2 },
    { day: '8/3', num: 0 },
    { day: '8/4', num: 10 },
    { day: '8/5', num: 23 },
    { day: '8/6', num: 4 },
    { day: '8/7', num: 23 },
    { day: '8/8', num: 7 },
  ];

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-full h-[300px] bg-orange-400 rounded-xl p-4">
          <div className="h-full flex flex-col text-white">
            <div className="flex flex-col justify-center flex-1 h-full py-4">
              <span className="text-sm sm:text-base">1주 평균 참여인원 수</span>
              <span className="text-2xl sm:text-4xl font-bold">20</span>
            </div>
            <div className="flex flex-col justify-center flex-1 h-full py-4">
              <span className="text-sm sm:text-base">오늘 통독완료 인원 수</span>
              <span className="text-2xl sm:text-4xl font-bold">18</span>
            </div>
          </div>
          <div className="flex flex-1 w-full justify-between pl-2">
            {testParticipant &&
              testParticipant.map(n => (
                <div key={n.day} className="flex flex-col text-white font-light">
                  <div className="flex-1">{n.num}</div>
                  <div className="">{n.day}</div>
                </div>
              ))}
          </div>
          <div className="text-white pl-2 font-semibold text-sm sm:text-base">총 23명</div>
        </div>

        <div className="flex flex-col sm:flex-row w-full h-[300px] border border-orange-400 rounded-xl p-8 mt-10 lg:mt-0 lg:ml-8">
          <div className="flex flex-row w-full flex-1">
            <div className="min-w-[100px] flex flex-col items-center">
              <div className="font-bold">진행중</div>
              <div>원차트</div>
            </div>
            <div className="flex-1 pl-2 ">
              <div className="font-bold text-xl mb-2">하루 통독기록</div>
              <div className="mb-2">기간 : </div>
              <div className="mb-2">예상완독일 : </div>
              <div className="mb-2">현재본문 : </div>
            </div>
          </div>
          <button className="bg-orange-400 rounded-xl text-white font-bold px-2 py-2 text-sm sm:text-base">
            187일차 (렘10)
            <div className="">읽으러 가기</div>
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default MeetingDetail;
