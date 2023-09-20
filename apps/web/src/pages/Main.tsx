import { Link } from 'react-router-dom';
import ArrowRight from '@/assets/svg/ArrowRight.svg';
import Card from '@/components/common/Card';
import Carousel from '@/components/common/Carousel';
import Marquee from '@/components/common/Marquee';
import VisibleItem from '@/components/Main/VisibleItem';
import { MAIN_PAGE_VIEWPORT } from '@/constants';

const CarouselCards = [
  {
    label: '모임 게시판',
    imgSrc: '/images/posts.gif',
    content: '게시판을 통해서 모임원들의 통독 계획을 공유하거나 교회 공동체 모임을 나눌 수 있습니다.',
  },
  {
    label: '게시글',
    imgSrc: '/images/post_create.gif',
    content: '게시글을 작성해서 해당 모임의 공지나 통독 계획 등을 공유해보세요.',
  },
  {
    label: '초대 링크로 팀원 초대',
    imgSrc: '/images/invite.gif',
    content: '초대 링크를 공유해서 팀원을 초대합니다.',
  },
  {
    label: '멤버',
    imgSrc: '/images/member_follow.png',
    content: '모임에 속한 팀원들을 확인하고 팔로우를 걸어보세요.',
  },
];

const visibleSections = [
  {
    label: '소개',
    element: (
      <div className="text-center h-[800px]">
        <div className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent-300 to-cyan-300">
          Biblical
        </div>
        <Marquee className="font-thin text-slate-400/60 text-sm" width="256px">
          Bible 성경 Bibel Библия Bibeln 圣经 Bijbel Biblia 聖書 Kinh Thánh Bibbia Kutsal Kitap
        </Marquee>
      </div>
    ),
  },
  {
    label: '성경읽기',
    element: (
      <div className="max-w-[1000px] w-full px-4 md:px-10 flex flex-col justify-between items-center">
        <div className="w-full text-start flex flex-col justify-between h-fit mb-10">
          <span className="text-2xl md:text-5xl/snug text-white mb-3 font-bold">
            성경을 읽고
            <br />
            묵상해보세요.
          </span>
          <span className="max-w-[700px] md:text-xl/snug text-white/60 font-semibold">
            말씀을 읽고 묵상하는 공간입니다. 하루를 성경 말씀과 함께 시작하여 더욱 풍성한 하루를 보내세요. 원하시는 성경
            구절이 있다면 언제든지 검색해 보실 수 있습니다.
          </span>
        </div>
        <img
          src="/images/bible_read.png"
          alt="bible_read"
          className="w-full h-fit max-h-[648px] rounded-xl shadow-xl shadow-indigo-900/50"
        />
      </div>
    ),
  },
  {
    label: '모임',
    element: (
      <div className="max-w-[1000px] w-full px-4 md:px-10 flex flex-col justify-between items-center">
        <div className="w-full text-start flex flex-col justify-between h-fit mb-10">
          <span className="text-2xl md:text-5xl/snug text-white mb-3 font-bold">
            교회 모임을 통한 <br />
            풍성한 나눔
          </span>
          <span className="max-w-[700px] md:text-xl/snug text-white/50 font-semibold">
            교회 공동체 모임을 가질 수 있는 공간입니다. 온라인에서 말씀을 읽고 묵상한 내용을 교회 팀과 함께 나눠보세요.
            가까운 친구나 청년부, 교회 내 모임 등 다양한 나눔의 기쁨을 만들어보세요.
          </span>
        </div>

        <Carousel>
          {CarouselCards?.map(card => (
            <Card key={card.label} label={card.label} content={card.content} imgSrc={card.imgSrc} />
          ))}
        </Carousel>
      </div>
    ),
  },
  {
    label: '가입',
    element: (
      <div className="max-w-[1000px] w-full px-4 md:px-10 flex flex-col justify-between items-center">
        <div className="w-full text-start flex flex-col justify-between h-fit mb-10">
          <span className="text-2xl md:text-5xl/snug text-white mb-3 font-bold">
            더 많은 내용을
            <br />
            확인하고 싶다면,
          </span>
        </div>
        <div className="bg-gradient-to-t from-pink-900/40 to-purple-900/40 shadow-xl shadow-purple-500/30 max-w-[1156px] w-full rounded-3xl">
          <Link to={`/auth/signup`} className="flex justify-between items-center p-5">
            <button className="max-w-[700px] text-lg md:text-xl text-white/80 font-medium">회원가입하러 가기</button>
            <div className="w-10 h-10 rounded-full flex justify-center items-center text-white">
              <ArrowRight stroke="white" width="40" height="40" strokeWidth="1.5" />
            </div>
          </Link>
        </div>
      </div>
    ),
  },
];

const Main = () => {
  return (
    <div
      className={`pb-32 bg-gradient-to-b from-white from-1% via-indigo-950 via-20% to-gray-950 to-70% h-[${MAIN_PAGE_VIEWPORT}]`}
    >
      {visibleSections?.map(v => (
        <VisibleItem key={v.label}>{v.element}</VisibleItem>
      ))}
    </div>
  );
};
export default Main;
