interface MeetingUserProps {
  MeetingId: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
}

interface MeetingsProps {
  MeetingUser: MeetingUserProps;
  name: string;
}
interface MemberProps {
  MeetingUser: MeetingUserProps;
  id: number;
  img: string | null;
  nickname: string;
}
